function validatePassword() {
    // Check if passwords are equal
    var pass = document.getElementById("password").value;
    var lowercaseCheck = /[a-z]/;
    var upperCaseCheck = /[A-Z]/;
    var specialNumCheck = /[^a-zA-Z\d\s:]/;
    var numCheck = /[0-9]/;

    if (!lowercaseCheck.test(pass.trim()) | !upperCaseCheck.test(pass.trim()) | !specialNumCheck.test(pass.trim()) | !numCheck.test(pass.trim()) | pass.trim().length < 6 | pass.trim().length > 15) {
        var passError = document.getElementById("passError");
        passError.innerHTML = "Incorrect Password";
        passError.style.display = "flex";
        return false;
    }

    window.location.href = '../Home.html';
    return false;
}
