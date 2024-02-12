function clickSection(clickedLink) {
    var links = document.querySelectorAll('.links > li');

    // Loop through each paragraph
    links.forEach(function (link) {
        // Remove any existing bottom border
        if(link.id!=="deleteAcc"){
        link.style.color = 'black';
        link.style.fontWeight = '100';
        }

    });
    document.getElementById("selectedForm").innerHTML = "Settings / " + clickedLink.textContent;
    clickedLink.style.color = '#ee5417';
    clickedLink.style.fontWeight = 'bold';
    switch (clickedLink.id) {
        case "profile":
            showProfile();
            break;
        case "orders":
            showOrderDetails();
            break;
        case "payment":
            showPayment();

    }
}

function showProfile() {
    var profileDetails = document.getElementById('UserSelection');
    var content = "<div id=\"UserForm\">" +
        "<div class=\"inputFieldDiv\">" +
        "<input type=\"text\" id=\"firstname\" name=\"firstname\" placeholder=\"First and last name\" " +
        "pattern=\"^[a-z|A-Z]{2,}$\" required>" +
        "</div>" +
        "<div class=\"inputFieldDiv\">" +
        "<input type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email\" required>" +
        "</div>" +
        "<hr>" +
        "<p id=\"passwordChange\">Change Password</p>" +
        "<div class=\"inputFieldDiv\">" +
        "<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" " +
        "title=\"Password must be between 6-15 characters and must include atleast one lowercase, uppercase, number, and special character\" " +
        "required>" +
        "</div>" +
        "<div class=\"inputFieldDiv\">" +
        "<input type=\"password\" id=\"confirm_password\" name=\"confirm_password\" placeholder=\"Confirm password\" required>" +
        "</div>" +
        "<div class=\"formButtonDiv\">" +
        "<input class=\"submitButton\" type=\"submit\" value=\"Save\">" +
        "</div>" +
        "</div>";

    profileDetails.innerHTML = content;
}


function showOrderDetails() {
    // Get the orderDetails div
    var orderDetails = document.getElementById('UserSelection');
    var content = "<div class=\"orderItem\">" +
        "<img src=\"../images/keyboard.png\" alt=\"Product Image\">" +
        "<div class=\"orderDetails\">" +
        "<h2>RGB Keyboard</h2>" +
        "<p>17\"x18\"Standard white keyboard with rgb lights. </p>" +
        "<ul>" +
        "<li><span class=\"specifics\">Quantity:</span> <span>&nbsp 1</span></li>" +
        "<li><span class=\"specifics\">Price:</span><span>&nbsp AED 120</span></li>" +
        "</ul>" +
        "</div>" +
        "</div>";
    var content2 = "<div class=\"orderItem\">" +
        "<img src=\"../images/mousepad.png\" alt=\"Product Image\">" +
        "<div class=\"orderDetails\">" +
        "<h2>RGB Gaming Mousepad</h2>" +
        "<p>10\"x10\" Black non-slip gaming mousepad with RGB lights. </p>" +
        "<ul>" +
        "<li><span class=\"specifics\">Quantity:</span> <span>&nbsp 1</span></li>" +
        "<li><span class=\"specifics\">Price:</span> <span>&nbsp AED 70</span></li>" +
        "</ul>" +
        "</div>" +
        "</div>";
    var content3 = "<div class=\"orderItem\">" +
        "<img src=\"../images/deskpad.png\" alt=\"Product Image\">" +
        "<div class=\"orderDetails\">" +
        "<h2>Office Deskpad</h2>" +
        "<p>20\"x20\" Premium Black sleek office deskpad. </p>" +
        "<ul>" +
        "<li><span class=\"specifics\">Quantity:</span> <span>&nbsp 1</span></li>" +
        "<li><span class=\"specifics\">Price:</span> <span>&nbsp AED 35</span></li>" +
        "</ul>" +
        "</div>" +
        "</div>";;
    orderDetails.innerHTML = content + content2 + content3;
}

function showPayment(){
    var paymentDetails = document.getElementById('UserSelection');
    var content="<div><p>COMING SOON whenever i finish</p>"+
    "</div>";
    paymentDetails.innerHTML=content;
}

function deleteAccount(){
    confirm("Are you sure you want to delete your account?");
    if(confirm){
        window.location.href = '../pages/Login.html'    }

}