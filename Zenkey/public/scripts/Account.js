
const params = new URLSearchParams(window.location.search);
const section = params.get('section');

//Function called on loading the page to check if the user has selected an item on the menu
function defaultSection(){
    if (section===null) {
        var defaultLink=document.getElementById('profile');
        defaultLink.style.color = '#ee5417';
        defaultLink.style.fontWeight = 'bold';
        showProfile();
    
    }
    else{
        clickSection(document.getElementById(section));
    }

}

window.onload = function() {
    defaultSection();

};

//function to reload the page when the user selects an item on the menu
function clicked(clickedLink){
    updateUrlParameter('section', clickedLink.id);
    location.reload();
}
// Function to handle click events on menu links
function clickSection(clickedLink) {
    

    // Reset styles for all links
    var links = document.querySelectorAll('.links > li:not(#deleteAcc)');
    links.forEach(function (link) {
        link.style.color = 'black';
        link.style.fontWeight = '100';
    });

    // Highlight the clicked link
    clickedLink.style.color = '#ee5417';
    clickedLink.style.fontWeight = 'bold';

    // Update breadcrumbs
    document.getElementById('breadcrumbs-active').textContent = clickedLink.textContent;

    // Show appropriate section based on the clicked link
    switch (clickedLink.id) {
        case "profile":
            showProfile();
            // updateUrlParameter('section', 'Profile');
            break;
        case "orders":
            showOrderDetails();
            // updateUrlParameter('section', 'Orders');
            break;
        case "payment":
            showPayment();
            // updateUrlParameter('section', 'Payment');
            break;
    }
}

// Function to update URL parameter
function updateUrlParameter(key, value) {
    var url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState(null, null, url.toString());
}

// Function to display profile section
function showProfile() {
    var profileDetails = document.getElementById('UserSelection');
    profileDetails.innerHTML = `
        <div class="infoTitle">
            User Info
        </div>
        <input class="inputFieldDiv" type="text" id="firstname" name="firstname"
            placeholder="Full name" pattern="^[a-z|A-Z]{2,}$" required>
        <input class="inputFieldDiv" type="email" id="email" name="email" placeholder="Email" required>
        <hr>
        <div class="infoTitle">
            Change Password
        </div>
        <input class="inputFieldDiv" type="password" id="password" name="password" placeholder="Password"
            title="Password must be between 6-15 characters and must include atleast one lowercase, uppercase, number, and special character"
            required>
        <input class="inputFieldDiv" type="password" id="confirm_password" name="confirm_password"
            placeholder="Confirm password" required>
        <input class="submitButton" type="submit" value="Save">`;
}

// Function to display order details section
function showOrderDetails() {
    var orderDetails = document.getElementById('UserSelection');
    orderDetails.innerHTML = '';

    // Retrieve ordered products from local storage
    let orderedProducts = JSON.parse(localStorage.getItem('orderedProducts')) || [];

    if (orderedProducts.length === 0) {
        orderDetails.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orderedProducts.forEach(function (product) {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.classList.add('order-item');

        orderItemDiv.innerHTML = `
            <div class="order-item-image-container">
                <img src="${product.image}" alt="Product Image" class="order-item-image">
            </div>
            <div class="order-item-details">
                <div class="order-item-name">${product.name}</div>
                <div class="order-item-quantity">
                    Quantity: ${product.quantity}
                </div>
                <div class="order-item-price">
                    Price: AED ${product.price.toFixed(2)}
                </div>
                <div class="order-item-view-product">
                    <a href="#" class="view-product-link" data-product-id="${product.id}">View Product</a>
                </div>
            </div>
        `;

        orderDetails.appendChild(orderItemDiv);
    });

    // Add event listener to View Product links
    orderDetails.querySelectorAll('.view-product-link').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = this.getAttribute('data-product-id');
            localStorage.setItem('selectedProductId', productId);
            window.location.href = "Product-view.html";
        });
    });
}

// Function to display payment section
function showPayment() {
    var paymentDetails = document.getElementById('UserSelection');
    paymentDetails.innerHTML = `
        <div class="infoTitle">
            Billing Details
        </div>
        <div class="checkout-field">
            <label for="name" class="checkout-label">Full Name</label>
            <input type="text" id="name" name="name" class="inputFieldDiv" placeholder="John Doe" required>
        </div>
        <div class="checkout-field">
            <label for="address" class="checkout-label">Street Address</label>
            <input type="text" id="address" name="address" class="inputFieldDiv" placeholder="Al Warqa 1" required>
        </div>
        <div class="checkout-field">
            <label for="address-2" class="checkout-label">Apartment (optional)</label>
            <input type="text" id="address-2" name="address-2" class="inputFieldDiv" placeholder="Villa 15">
        </div>
        <div class="checkout-field">
            <label for="city" class="checkout-label">Town/City</label>
            <input type="text" id="city" name="city" class="inputFieldDiv" placeholder="Dubai" required>
        </div>
        <div class="checkout-field">
            <label for="phone" class="checkout-label">Phone</label>
            <input type="tel" id="phone" name="phone" class="inputFieldDiv" placeholder="+971 50 123 4567" required>
        </div>
        <div class="checkout-field">
            <label for="email" class="checkout-label">Email</label>
            <input type="email" id="email" name="email" class="inputFieldDiv" placeholder="johndoe@gmail.com" required>
        </div>
        <div class="infoTitle">
            Card Details
        </div>
            <div class="checkout-field">
                <label for="cardholder" class="checkout-label">Cardholder Name</label>
                <input type="text" id="cardholder" name="cardholder" class="inputFieldDiv" placeholder="John Doe" required>
            </div>
            <div class="checkout-field">
                <label for="card-number" class="checkout-label">Card Number</label>
                <input type="text" id="card-number" name="card-number" class="inputFieldDiv" placeholder="1111 2222 3333 4444" required>
            </div>
            <div class="checkout-field">
                <div class="checkout-group-inline">
                    <div class="expiry-input">
                        <label for="expiry-date" class="checkout-label">Expiry Date</label>
                        <input type="text" id="expiry-date" name="expiry-date" class="inputFieldDiv" placeholder="mm/yy" required>
                    </div>
                    <div class="cvv-input">
                        <label for="cvv" class="checkout-label">CVV</label>
                        <input type="text" id="cvv" name="cvv" class="inputFieldDiv" placeholder="123" required>
                    </div>
                </div>
            </div>
            <hr class="checkout-hr">
            <input class="submitButton" type="submit" value="Save"> `;
}


// Function to confirm account deletion
function deleteAccount() {
    confirmation("Are you sure?", "This action will permanently delete your account.");
}
