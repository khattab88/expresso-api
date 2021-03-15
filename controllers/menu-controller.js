/* eslint-disable prettier/prettier */

// const Menu = require('../models/menu-model');
const { Restaurant, Menu, MenuSection, MenuItem, MenuItemOption, MenuItemOptionItem } = require('expresso-models');
// const menuRepo = require('../repositories/menu-repository');
const { menuRepository: menuRepo } = require('expresso-repositories');

const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");

// exports.getAllMenus = controllerFactory.getAll(Menu, menuRepo);
exports.getAllMenus = catchAsync(async (req, res, next) => {
    let menus = [];

    if(req.params.restaurantId) {
        const restaurant = await Restaurant.findOne({ "id":  req.params.restaurantId });

        menus.push(await Menu.findOne({ "restaurant": restaurant._id }));

        for(let menu of menus) {
            const sectionPromises = menu.menuSections.map(async section => {
                const menuSection = await MenuSection.findOne({ id: section });
                menuSection.menu = undefined;

                const menuItemPromises = menuSection.menuItems.map(async item => {
                    const menuItem = await MenuItem.findOne({ id: item });
                    menuItem.menuSection = undefined;

                    const itemOptionPromises = menuItem.options.map(async option => {
                        const itemOption = await MenuItemOption.findOne({ id: option });

                        const itemOptionItemPromises = itemOption.optionItems.map(async optionItem => {
                            const itemOptionItem = await MenuItemOptionItem.findOne({ id: optionItem });
                            return itemOptionItem;
                        });
                        itemOption.optionItems = await Promise.all(itemOptionItemPromises);

                        return itemOption;
                    });
                    menuItem.options = await Promise.all(itemOptionPromises);

                    return menuItem;
                });
                menuSection.menuItems = await Promise.all(menuItemPromises);

                return menuSection;
            });
            menu.menuSections = await Promise.all(sectionPromises);
        }

    } else {
        menus = await menuRepo.getAll();
    }

    res.status(200).json({
        status: "success",
        count: menus.length,
        data: { docs: menus }
    });
});

exports.getMenu = controllerFactory.getById(menuRepo);

exports.createMenu = controllerFactory.create(menuRepo);

exports.updateMenu = controllerFactory.update(menuRepo);

exports.deleteMenu = controllerFactory.delete(menuRepo);
