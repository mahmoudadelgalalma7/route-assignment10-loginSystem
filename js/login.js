
var Email = document.getElementById("email")
var Password = document.getElementById("password")
var loginBtn = document.getElementById("loginBtn")
var errMsg = document.getElementById("errorMsg")
var nameField = document.getElementById("nameField")
var signOut = document.getElementById("signOut")

var err;
var indexLogged;

if (localStorage.getItem("Users")) {
    usersList = JSON.parse(localStorage.getItem("Users"))
} else {
    usersList = []
}

function checkEmptyInput_Login(){
    if (Email.value == "" || Password.value == "") {
        err = "All Fields Are Required"
        console.log("Empty Fields")
        return 0
    } else {
        return 1
    }
}

function clearInputs_Login(){
    Email.value = ""
    Password.value = ""
}

function checkLogin(){
    if(checkEmptyInput_Login()){
        for(var i = 0;i < usersList.length; i++){
            if (Email.value == usersList[i].email)
            {
                if (Password.value == usersList[i].password)
                {
                    indexLogged = i
                    localStorage.setItem("indexLogged",JSON.stringify(indexLogged))
                    return 1
                } 
                else 
                {
                    err = "Password is not correct"
                    return 0
                }
            }
        }
        err = "Email is not correct"
        return 0
    } else {
        return 0
    }
}
if (loginBtn) {
    loginBtn.addEventListener("click",function(){
        if(checkLogin()){
            alert("Login Successfully! Go To Home Page")
            window.close()
            window.open("/home.html")
        } else {
            errMsg.innerHTML = err
            clearInputs_Login()
        }
    })
}

// Home Page
function updateHomePage(){
    if (localStorage.getItem("indexLogged")) {
        indexLogged = localStorage.getItem("indexLogged")
    }
    nameField.innerHTML = usersList[indexLogged].userName
}

if(signOut){
    signOut.addEventListener('click',function(){
        localStorage.removeItem("indexLogged")
        window.close()
        window.open("/login.html")
    
    })
}

if (!(localStorage.getItem("indexLogged")) && window.location.pathname == "/home.html") {
    window.close()
    window.open("/login.html")
}