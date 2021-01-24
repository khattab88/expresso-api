import "@babel/polyfill";
import { checkout } from "./checkout";

// DOM ELEMENTS
const checkoutBtn = document.querySelector("#checkout-btn");

if(checkoutBtn) {
    checkoutBtn.addEventListener("click", e => {
        e.target.textContent = "Processing...";

        const { orderId } = e.target.dataset;
        console.log(orderId);
        checkout(orderId);
    });
}