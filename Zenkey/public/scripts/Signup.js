function validatePassword() {
    //check if passwords are equal
    var pass = document.getElementById("password").value;
    var pass2 = document.getElementById("confirm_password").value;
    var lowercaseCheck= /[a-z]/;
    var upperCaseCheck = /[A-Z]/;
    var specialCheck=/[^a-zA-Z\d\s:]/;
    var numCheck=/[0-9]/;

    if(!lowercaseCheck.test(pass.trim())){
        document.getElementById("passError").innerHTML = "Password should include atleast one lowercase letter";
        return false;

    }
    if(!upperCaseCheck.test(pass.trim())){
        document.getElementById("passError").innerHTML = "Password should include atleast one uppercase letter";
        return false;

    }
    if(!specialCheck.test(pass.trim())){
        document.getElementById("passError").innerHTML = "Password should include atleast one special character";
        return false;

    }

    if(!numCheck.test(pass.trim())){
        document.getElementById("passError").innerHTML = "Password should include atleast one digit";
        return false;

    }

    if(pass.trim().length<8 | pass.trim().length>15){
        document.getElementById("passError").innerHTML = "Password length should be between 8-15 characters";
        return false;

    }

    if (pass.trim() != pass2.trim()) {
        document.getElementById("passError").innerHTML = "Passwords do not match";
        return false;
    }

    window.location.href = './Home.html';
    return false;

}