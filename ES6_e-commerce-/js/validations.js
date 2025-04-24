
// =========== Validation ==========
function validateName(nameIn, errName) {

    let reg = /^[a-z \- \_ A-Z]{3,}$/

    const name = nameIn.value.trim();
    if (!reg.test(name) || name.length === 0) {
        errName.style.display = "block"
        return false
    } else {
        errName.style.display = "none"
        return true
    }

}

function validateEmail(emailIn, errEmail) {
    let reg = /^\w{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,3}$/

    if (!reg.test(emailIn.value) || emailIn.value.length == 0) {
        errEmail.style.display = "block"
        return false
    } else {
        errEmail.style.display = "none"
        return true
    }
}

function validatePassword(passIn, errPass) {
    const password = passIn.value.trim();
    let reg = /[\w]/
    let special_reg = /[!@#$%^&*()_-]/
    let reg_capital = /[A-Z]/
    let reg_small = /[a-z]/
    let reg_num = /[0-9]/
    if (
        !reg.test(password) ||
        !special_reg.test(password) ||
        !reg_capital.test(password) ||
        !reg_small.test(password) ||
        !reg_num.test(password) ||
        password.length < 8) {

        errPass.style.display = "block"
        errPass.innerHTML = "please enter valid password, password must contain special charcter, capital characetr, number, small characters & at least 8 characters"
        return false
    } else {
        errPass.style.display = "none"
        return true

    }

}

function validateConfirmPassword(passIn, confirmPassIn, errConf_Pass) {
    const password = passIn.value.trim();
    const confirmPassword = confirmPassIn.value.trim();
    if (password != confirmPassword) {
        errConf_Pass.style.display = "block"
        errConf_Pass.innerText = "Confirm password must be the same as password"
        return false
    } else {
        errConf_Pass.style.display = "none"
        return true
    }
}

export { validateConfirmPassword, validateName, validateEmail, validatePassword }

