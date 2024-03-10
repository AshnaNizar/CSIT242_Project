// Handles the billing details and checkout summary
document.addEventListener("DOMContentLoaded", function () {
    const checkoutButton = document.querySelector(".priced-checkout-button");
    const masterImage = document.querySelector(".master-image");
    const visaImage = document.querySelector(".visa-image");

    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents the default button action

        // Get all input fields
        const inputs = document.querySelectorAll(".checkout-input");

        // Validate input fields
        let isValid = true;
        inputs.forEach(function (input) {
            if (input.hasAttribute("required") && input.value.trim() === "") {
                input.classList.add("invalid");
                isValid = false;
            } else {
                input.classList.remove("invalid");
            }
        });

        // Validate phone number
        const phoneInput = document.getElementById("phone");
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Regex for international phone number format
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add("invalid");
            isValid = false;
        } else {
            phoneInput.classList.remove("invalid");
        }

        // Validate email
        const emailInput = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add("invalid");
            isValid = false;
        } else {
            emailInput.classList.remove("invalid");
        }

        // Validate card number
        const cardNumberInput = document.getElementById("card-number");
        const cardNumberRegex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/; // Regex for card number format
        if (!cardNumberRegex.test(cardNumberInput.value)) {
            cardNumberInput.classList.add("invalid");
            isValid = false;
        } else {
            cardNumberInput.classList.remove("invalid");
        }

        // Validate expiry date
        const expiryDateInput = document.getElementById("expiry-date");
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Regex for expiry date format (MM/YY)
        if (!expiryDateRegex.test(expiryDateInput.value)) {
            expiryDateInput.classList.add("invalid");
            isValid = false;
        } else {
            expiryDateInput.classList.remove("invalid");
        }

        // Validate CVV
        const cvvInput = document.getElementById("cvv");
        const cvvRegex = /^\d{3,4}$/; // Regex for CVV format (3 or 4 digits?)
        if (!cvvRegex.test(cvvInput.value)) {
            cvvInput.classList.add("invalid");
            isValid = false;
        } else {
            cvvInput.classList.remove("invalid");
        }

        // Check if card type is selected
        const cardTypeSelected = masterImage.classList.contains("selected") || visaImage.classList.contains("selected");
        if (!cardTypeSelected) {
            masterImage.classList.add("invalid");
            visaImage.classList.add("invalid");
            isValid = false;
        } else {
            masterImage.classList.remove("invalid");
            visaImage.classList.remove("invalid");
        }

        // If all input fields are valid, show success message
        if (isValid) {
            alert("Payment has been made!","");
        } else {
            alert("Please enter the details correctly.","");
        }
    });

    // Card type selection
    masterImage.addEventListener("click", function () {
        masterImage.classList.add("selected");
        visaImage.classList.remove("selected");
        masterImage.classList.remove("invalid");
        visaImage.classList.remove("invalid");
    });

    visaImage.addEventListener("click", function () {
        visaImage.classList.add("selected");
        masterImage.classList.remove("selected");
        visaImage.classList.remove("invalid");
        masterImage.classList.remove("invalid");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const buttonPriceElement = document.getElementById('button-price');

    // Retrieve cart products from array in local storage
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // Function to update subtotal, shipping, and total in the cart summary
    const updateSummary = () => {
        let subtotal = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
        let shipping = 0;
        if (subtotal > 0 && subtotal < 1000) {
            shipping = 30;
        }
        subtotalElement.textContent = `AED ${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Free' : `AED ${shipping.toFixed(2)}`;
        totalElement.textContent = `AED ${(subtotal + shipping).toFixed(2)}`;
        buttonPriceElement.textContent = `AED ${(subtotal + shipping).toFixed(2)}`;
    };

    // Call updateSummary to display the subtotal, shipping, and total on page load
    updateSummary();
});