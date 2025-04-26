import { getUserByEmail, isUserExists } from "./auth.js"
import { storeInLocalStorage } from "../js/helper.js"

let login_form = document.getElementById("login-form")
console.log(login_form)
let inputs = login_form.getElementsByTagName("input")
let emailIn = inputs[0]
let passIn = inputs[1]


let errrLogin = login_form.getElementsByClassName("error-login")[0]

login_form.addEventListener("submit", (e) => {
    e.preventDefault()
    let loggedUser = getUserByEmail(emailIn.value)
    console.log("from login email : , ", emailIn.value)
    // console.log(loggedUser)
    storeInLocalStorage("loggedUser", loggedUser)
    if (isUserExists(emailIn.value, passIn.value)) {
        location.assign("./home.html")
        // storeInLocalStorage("currentUser", { name: nameIn.value, email: emailIn.value, password: passIn.value })
        storeInLocalStorage("name", nameIn.value)
    }
    else
        errrLogin.style.display = 'block'
})
