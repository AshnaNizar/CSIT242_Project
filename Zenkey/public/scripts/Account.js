
function clickSection(clickedLink) {
    var links = document.querySelectorAll('.links > li');

    // Loop through each paragraph
    links.forEach(function (link) {
        // Remove any existing bottom border
        if (link.id !== "deleteAcc") {
            link.style.color = 'black';
            link.style.fontWeight = '100';
        }

    });
    // change the text content of the breadcrumbs-active to the clicked link
    document.getElementById('breadcrumbs-active').textContent = clickedLink.textContent;
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
        "<img src=\"../images/keyboard1.png\" alt=\"Product Image\">" +
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

function showPayment() {
    var paymentDetails = document.getElementById('UserSelection');
    const content = `
    <div class="checkout-billing">
        <div class="checkout-title">
          <h3>  Billing Details </h3>
        </div>
        <div class="checkout-group">
            <label for="name" class="checkout-label">Full Name</label>
            <input type="text" id="name" name="name" class="checkout-input" placeholder="John Doe" required>
        </div>
        <div class="checkout-group">
            <label for="address" class="checkout-label">Street Address</label>
            <input type="text" id="address" name="address" class="checkout-input" placeholder="Al Warqa 1" required>
        </div>
        <div class="checkout-group">
            <label for="address-2" class="checkout-label">Apartment (optional)</label>
            <input type="text" id="address-2" name="address-2" class="checkout-input" placeholder="Villa 15">
        </div>
        <div class="checkout-group">
            <label for="city" class="checkout-label">Town/City</label>
            <input type="text" id="city" name="city" class="checkout-input" placeholder="Dubai" required>
        </div>
        <div class="checkout-group">
            <label for="phone" class="checkout-label">Phone</label>
            <input type="tel" id="phone" name="phone" class="checkout-input" placeholder="+971 50 123 4567" required>
        </div>
        <div class="checkout-group">
            <label for="email" class="checkout-label">Email</label>
            <input type="email" id="email" name="email" class="checkout-input" placeholder="johndoe@gmail.com" required>
        </div>
    </div>
    
    <div class="checkout-card-details">
        <div class="checkout-title">
          <h3>  Card Details </h3>
        </div> 
        <div class="checkout-group">
            <label for="cardholder" class="checkout-label">Cardholder Name</label>
            <input type="text" id="cardholder" name="cardholder" class="checkout-input" placeholder="John Doe" required>
        </div>
        <div class="checkout-group">
            <label for="card-number" class="checkout-label">Card Number</label>
            <input type="text" id="card-number" name="card-number" class="checkout-input" placeholder="1111 2222 3333 4444" required>
        </div>
        <div class="checkout-group-inline">
            <div class="checkout-group expiry-input">
                <label for="expiry-date" class="checkout-label">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date" class="checkout-input" placeholder="mm/yy" required>
            </div>
            <div class="checkout-group cvv-input">
                <label for="cvv" class="checkout-label">CVV</label>
                <input type="text" id="cvv" name="cvv" class="checkout-input" placeholder="123" required>
            </div>
        </div>
        <hr class="checkout-hr">
        <div class=\"formButtonDiv\">
        <input class=\"submitButton\" type=\"submit\" value=\"Save\"> 
        </div>
    </div>
    `;
    
    paymentDetails.innerHTML = content;
}

function deleteAccount() {
    confirmation("Are you sure?","This action will permanently delete your account.")

}