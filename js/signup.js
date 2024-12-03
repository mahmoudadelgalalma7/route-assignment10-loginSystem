var Name = document.getElementById("name")
var Email = document.getElementById("email")
var Password = document.getElementById("password")
var signUpBtn = document.getElementById("signup-btn")
var errMsg = document.getElementById("errorMsg")
var err;

if (localStorage.getItem("Users")) {
    usersList = JSON.parse(localStorage.getItem("Users"))
} else {
    usersList = []
}

signUpBtn.addEventListener("click",saveUser)


function saveUser() {
    user = {
        userName: Name.value,
        email : Email.value,
        password : Password.value
    }

    if (checkEmptyInput_SignUp() && validateEmail()) {
        usersList.push(user)
        localStorage.setItem("Users",JSON.stringify(usersList))
        alert("SignedUp Successfully! Go To Login Page")
        window.open("login.html")
    } else {
        errMsg.innerHTML = err
    }
    clearInputs_SignUp()
}

function validateEmail(){
    var regex = /^[A-Za-z0-9]{1,}(@)[A-Za-z]{1,}(\.)[A-Za-z]{1,}$/
    if (regex.test(Email.value)) {
        for(var i = 0;i < usersList.length; i++){
            if (Email.value == usersList[i].email) {
                console.log("Email already existed")
                err = "Email is already existed Please Enter another Email"
                return 0
            }
        }
        return 1;
    } else {
        err = checkEmptyInput_SignUp()? "Email is not Valid  Please Enter a Valid Email" : ""
        console.log("EMail is not valid")
        return 0;
    }
}
function checkEmptyInput_SignUp(){
    if (Name.value == "" || Email.value == "" || Password.value == "") {
        err = "All Fields Are Required"
        console.log("Empty Fields")
        return 0
    } else {
        return 1
    }
}
function clearInputs_SignUp(){
    Name.value = ""
    Email.value = ""
    Password.value = ""
}

