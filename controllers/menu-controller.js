/* eslint-disable prettier/prettier */
const Menu = require('../models/menu-model');
const menuRepo = require('../repositories/menu-repository');

exports.getStats = async (req, res) => {
    try {
        const stats = await menuRepo.getStats();

        res.status(200).json({
            status: 'success',
            data: {
              stats: stats,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await menuRepo.getAll();

    // return resposne
    res.status(200).json({
      status: 'success',
      count: menus.length,
      data: {
        menus: menus,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
