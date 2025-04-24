
import { applyNavbarFunc } from "../js/build_components.js";
import { getProductById, addToCartById } from "../js/helper.js"
document.addEventListener("DOMContentLoaded", (event) => {

    // ========= build navbar =====
    build_details()

    async function build_details() {
        fillData()
    }



    async function fillData() {
        let myProd = await getProductById(localStorage.getItem("prodId"))
        myProd = myProd[0]
        // ===== Main Image========
        let img_container = document.getElementById("mainImg")
        let img = img_container.getElementsByTagName("img")[0]
        img.setAttribute("src", myProd.images[0])

        //  ========= Header ==============
        let header = document.getElementsByClassName("card-title")[0]
        header.innerText = myProd.title;

        //  ========= paragraph ==============
        let card_text = document.getElementsByClassName("card-text")[0]
        card_text.innerText = myProd.description;

        //  ========= Rating ==============
        let rating = document.getElementsByClassName("rating")[0]

        rating.innerText = `Rating: ${myProd.rating.rate}/5`;

        //  ========= Price ==============
        let price = document.getElementsByClassName("price")[0]
        price.innerText = `Price: ${myProd.price}$`;

        //  ========= category ==============
        let quantity = document.getElementsByClassName("quantity")[0]
        quantity.innerText = `Quantity: ${myProd.rating.count}`;

        //  ========= Quantity ==============
        let category = document.getElementsByClassName("category")[0]
        category.innerText = `Category: ${myProd.category}`;

        // ============add to cart ==========
        let addToCart = document.getElementsByClassName("addToCart")[0]
        addToCart.addEventListener("click", (e) => {
            addToCartById(myProd.id)
        })

    }
    applyNavbarFunc()
});