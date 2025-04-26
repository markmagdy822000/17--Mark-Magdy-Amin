import { validateConfirmPassword, validateName, validateEmail, validatePassword } from "./validations.js"
import { getUsers, addUserAccount, isUserExists } from "./auth.js"

// ========= catch elements =========
let reg_form = document.getElementById("register-form")

let inputs = reg_form.getElementsByTagName("input")
let nameIn = inputs[0]
let emailIn = inputs[1]
let passIn = inputs[2]
let confirmPassIn = inputs[3]

let errors = reg_form.querySelectorAll("[class|='error']")
let errName = errors[0]
let errEmail = errors[1]
let errPass = errors[2]
let errConf_Pass = errors[3]

let hasAccount = reg_form.querySelector("#hasAccount")

// =========== event listeners ==========
hasAccount.addEventListener("click", () => {
    location.assign("./html/login.html")
})

nameIn.addEventListener("input", () => {
    validateName(nameIn, errName)
})

emailIn.addEventListener("input", () => {
    validateEmail(emailIn, errEmail)
})

passIn.addEventListener("input", () => {
    validatePassword(passIn, errPass)

})
confirmPassIn.addEventListener("input", () => {
    validateConfirmPassword(passIn, confirmPassIn, errConf_Pass)
})

reg_form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateName(nameIn, errName)
        && validateEmail(emailIn, errEmail)
        && validatePassword(passIn, errPass)
        && validateConfirmPassword(passIn, confirmPassIn, errConf_Pass)
    ) {
        if (!isUserExists(emailIn.value, passIn.value)) {
            addUserAccount(nameIn, emailIn, passIn)
            getUsers()
            location.assign("./html/login.html")
        } else {
            document.getElementsByClassName("error-register")[0].innerText = "user already exists"
            document.getElementsByClassName("error-register")[0].style.display = "block"
            console.log("user exists")
        }
    }
})

