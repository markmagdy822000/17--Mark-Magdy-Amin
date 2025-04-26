import { logout } from "../js/auth.js"
import { getFromLocalStorage } from "../js/helper.js";

function build_navbar() {
    let navbar = document.createElement("nav")

    let loggedUser = getFromLocalStorage("loggedUser");
    let cartCount = getFromLocalStorage("cartProducts");
    console.log("cartCount: ", cartCount)
    cartCount ? "" : cartCount = [];
    // while (!cartCount) { }

    navbar.innerHTML = `<header class="">
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a class="nav-link active home-page" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                <span class="badge text-bg-danger rounded-pill notification">   ${cartCount.length} </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-cart3 cart-icon" viewBox="0 0 16 16">
                        
                        <path   
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link username" href="#">${loggedUser.name} </a>
            </li>
            <li class="nav-item">
                <a class="nav-link logout" href="#">Logout</a>
            </li>
        </ul>
    </header>`
    document.body.insertAdjacentElement("afterbegin", navbar)
}
function updateCartCount() {
    let cartCount = getFromLocalStorage("cartProducts").length;
    let notificationElement = document.querySelector('.notification');
    if (notificationElement) {
        notificationElement.textContent = cartCount;
    }
}
function build_footer() {
    let footer = document.createElement("section")
    footer.innerHTML =
        `<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>About Us</h3>
      <p>We provide quality products with fast delivery and excellent customer service.</p>
    </div>
    
    <div class="footer-section">
      <h3>Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Cart</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <h3>Contact Info</h3>
      <p>1550 EL Zaher Street, Cairo</p>
      <p>01234567890</p>
      <p>mark@gmail.com</p>
    </div>
  </div>
  
   <div class="footer-bottom">
    <p>&copy; 2023 MKGrouP. All rights reserved.</p>
    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-linkedin"></i></a>
    </div>
    <!-- Back to Top Arrow -->
    <div class="back-to-top" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
      <img class="arrow-up" src="../images/arrow-up.svg">
    </div>
  </div>


</footer>`
    document.body.append(footer)
}

function goToCart() {
    let cart_icon = document.querySelector(".cart-icon")
    console.log("cart_icon:", cart_icon)
    cart_icon.addEventListener("click", () => {
        location.assign("../html/cart.html")
    })
}

function goToHome() {
    let home_icon = document.querySelector(".home-page")

    home_icon.addEventListener("click", () => {
        location.assign("../html/home.html")
    })
}

function applyLogout() {
    console.log("from applyloggin out")
    let logout_icon = document.querySelector(".logout")
    logout_icon.addEventListener("click", () => {
        logout()
    })
}

function applyNavbarFunc() {
    build_navbar()
    goToCart()
    goToHome()
    applyLogout()
    build_footer()

}

export { build_navbar, updateCartCount, applyNavbarFunc, applyLogout, goToCart, goToHome }