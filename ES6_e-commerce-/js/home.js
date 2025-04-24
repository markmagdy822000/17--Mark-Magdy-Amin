
import { applyNavbarFunc } from "./build_components.js";
import { addToCartById, getFromLocalStorage, filterProducts, intialdisplay } from "../js/helper.js";

/* ============= Carousel ============= */
document.addEventListener('DOMContentLoaded', () => {
    console.log(".carousel-control-next =>> ", document.querySelector(".carousel-control-next"))
    const next_btn = document.querySelector(".carousel-control-next");
    const prev_btn = document.querySelector(".carousel-control-prev");
    const carousel_inner = document.querySelector(".carousel-inner");
    const items = Array.from(document.querySelectorAll(".carousel-item"));
    let index = 0;

    items.forEach(item => {
        item.classList.add("active");
    })
    function updateItem(direction) {
        let prevIndex = index;
        if (direction === "next") {
            index = (index + 1) % items.length;
            console.log("items: ", items)
            items[prevIndex].style.animation = `1s center_left forwards`;
            items[index].style.animation = `1s right_center  forwards`;
        } else {
            index = (index - 1 + items.length) % items.length;
            items[prevIndex].style.animation = `1s  center_right forwards`;
            items[index].style.animation = `1s left_center  forwards`;
        }
    }

    next_btn.addEventListener("click", () => updateItem("next"));
    prev_btn.addEventListener("click", () => updateItem("prev"));

    // ================= Cards ===============
    displayProducts(getFromLocalStorage("allProducts"))

    uponFromChange()
    buildFilter()

    let listGp = document.querySelectorAll(".list-group input[type='checkbox']");


    const products_section = document.querySelector(".products-section");

    products_section.addEventListener("click", (e) => {
        const clickedCard = e.target.closest(".card");
        if (clickedCard) {
            localStorage.setItem("prodId", clickedCard.id);
            location.assign("../html/details.html");
        }
    });



    intialdisplay()
    applyNavbarFunc()

})

function getAllCategories() {
    let checkedBoxes = document.querySelectorAll(".list-group input[type='checkbox']:checked");
    let categories = []
    checkedBoxes.forEach(checkedBox => {
        categories.push(checkedBox.value)
    })

    return categories;

}
async function displayProducts(filterdProducts) {
    let products_section = document.getElementsByClassName("products-section")[0]
    products_section.innerHTML = ""
    let products = await filterdProducts
    console.log("products: ", products)

    await products.forEach(prod => {
        let product_section = document.createElement("div")
        product_section.innerHTML = `
        <div class="col">
            <div class="card" id="${prod.id}">
            <img src="${prod.images[0]}"  class="card-img-top" alt="">
                <div class="card-body">
                    <div class="text-card">
                        <h5 class="truncate card-title">${prod.title}</h5>
                        <span>Rating: ${prod.rating}</span><br>
                        <span>In Stock: ${prod.stock}</span><br>
                        <span>In Price: ${prod.price}</span>
                    </div>
                    <button class="w-50  me-3 add-btn">
                        <svg class="w-25" viewBox="0 0 24 24" fill="#000">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                        </svg>
                    </button>
                </div>
            </div>  
        </div>
    `
        product_section.querySelector(".add-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            addToCartById(prod.id)
        })
        products_section.append(product_section);
    })
}

// ================ Filter ===========
function getAllUniqueCategories() {
    let allProducts = getFromLocalStorage("allProducts")
    let allCategories = [];
    allProducts.forEach(prod => {
        allCategories.push(prod.category)
    })
    allCategories = [...new Set(allCategories)]
    return allCategories;
}

function uponFromChange() {
    let form = document.getElementById("filter-form")

    form.addEventListener("change", async () => {
        let allCategories = getAllCategories()
        console.log("allCategories: ", allCategories)

        // price
        let fromIn = document.getElementById("fromPriceFilter")
        let toIn = document.getElementById("toPriceFilter")
        filterProducts(allCategories, fromIn.value, toIn.value)
    })
}


async function buildFilter() {
    let allCategories = getAllUniqueCategories()

    let list_group = document.querySelector(".list-group")
    allCategories.forEach(cat => {
        let item = document.createElement("div")
        item.innerHTML = `<li class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" checked value="${cat}" id="${cat}">
        <label class="form-check-label" for="${cat}">${cat}</label>
        </li>`
        list_group.append(item)
    });


    // ======== price ==========
    let priceDiv = document.createElement("div")
    priceDiv.innerHTML = `<label class="input"  for= "fromPriceFilter"> From</label > <input id="fromPriceFilter" type=number /> 
    <label class="input" for= "toPriceFilter"> To </label > <input id="toPriceFilter" type=number />`
    list_group.append(priceDiv)

}

export { displayProducts }