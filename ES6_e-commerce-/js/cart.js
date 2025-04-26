import { addToCartById, emptyCart, getCartProducts, getTotalCost, removeFromCartById } from "../js/helper.js"
import { applyNavbarFunc } from "./build_components.js";

let cart_container = document.querySelector('.cart-container');

function build_totalCost() {
    let totalCost = document.createElement("section")
    totalCost.setAttribute("class", "totalCost")
    totalCost.innerHTML = `<p>Total Cost: <span>${getTotalCost()}</span></p>`;
    cart_container.append(totalCost)
}

function build_buyNow() {
    let buyNow = document.createElement("section")
    buyNow.setAttribute("class", "buyNow")
    buyNow.innerHTML = `<button  class=" btn btn-success w-100 h-100 ">Buy Now !</button>`
    buyNow.addEventListener("click", () => {
        emptyCart()
        location.assign("../html/orderShipped.html")
    })
    cart_container.append(buyNow)
}

function buildCartProducts() {
    cart_container.innerHTML = ``
    let cart_products = getCartProducts()

    cart_products.forEach(cart_product => {

        let cart_product_section = document.createElement("div")
        cart_product_section.classList.add("col-12")
        cart_product_section.innerHTML = `
        <div id="${cart_product.id}" class=" d-flex justify-content-center align-items-center  w-50 cart-product">
        
        <div class=" col-6 d-flex align-items-center ">
        
        <img class="ms-4  col-1" src="${cart_product.images[0]} " >
        <span class="ms-4 col-8 name  ">${cart_product.title} </span>
        
        <span class="m-4  price">${cart_product.price * cart_product.number_in_cart.toFixed(2)} </span>
            </div>
            <div class="col-6 d-flex flex-row-reverse  align-items-center ">
            <span class="me-4 plus-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg> </span>
            <span class="count">${cart_product.number_in_cart}</span>
            <span class="minus-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="11" width="16" height="2" fill="currentColor"/>
            </svg> </span>
            </div>
        </div>
    `
        cart_container.append(cart_product_section);
    });
    build_totalCost()
    addingFunctionality()
    build_buyNow()
}

function addPlusFunctioanlity() {
    let plus_btns = document.querySelectorAll(".plus-icon")
    plus_btns.forEach(plus_btn => {
        plus_btn.addEventListener("click", (e) => {
            addToCartById(e.target.closest(".cart-product").id)
            buildCartProducts()
        })
    });
}

function addMinusFunctioanlity() {
    let minus_btns = document.querySelectorAll(".minus-icon")

    minus_btns.forEach(plus_btn => {

        // console.log("plus_btn:", plus_btn)
        plus_btn.addEventListener("click", (e) => {

            // console.log(e.target)
            // console.log(e.target.closest(".cart-product"))
            // console.log(e.target.closest(".cart-product").id)
            removeFromCartById(e.target.closest(".cart-product").id)
            buildCartProducts()
        })
    });
}

function addingFunctionality() {
    addPlusFunctioanlity()
    addMinusFunctioanlity()
}

buildCartProducts()
applyNavbarFunc()