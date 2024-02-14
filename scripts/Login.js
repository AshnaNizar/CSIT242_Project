function validatePassword() {
    //check if passwords are equal
    var pass = document.getElementById("password").value;
    var lowercaseCheck= /[a-z]/;
    var upperCaseCheck = /[A-Z]/;
    var specialNumCheck=/[^a-zA-Z\d\s:]/;
    if(!lowercaseCheck.test(pass.trim())|!upperCaseCheck.test(pass.trim())|!specialNumCheck.test(pass.trim())|pass.trim().length<6 | pass.trim().length>15){
        document.getElementById("passError").innerHTML = "Incorrect Password";
        return false;

    }


    window.location.href = '../pages/Signup.html';
    return false;

}