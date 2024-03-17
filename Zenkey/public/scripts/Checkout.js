importScripts("/scripts/progressive-ui-kitt/progressive-ui-kitt-sw-helper.js");

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
            const label = input.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");

            if (input.hasAttribute("required") && input.value.trim() === "") {
                if (!errorIndicator) {
                    label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
                }
                isValid = false;
            } else {
                if (errorIndicator) {
                    label.removeChild(errorIndicator); // Remove asterisk from label if present
                }
            }
        });

        // Validate phone number
        const phoneInput = document.getElementById("phone");
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Regex for international phone number format
        if (!phoneRegex.test(phoneInput.value)) {
            const label = phoneInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate email
        const emailInput = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
        if (!emailRegex.test(emailInput.value)) {
            const label = emailInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate card number
        const cardNumberInput = document.getElementById("card-number");
        const cardNumberRegex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/; // Regex for card number format
        if (!cardNumberRegex.test(cardNumberInput.value)) {
            const label = cardNumberInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate expiry date
        const expiryDateInput = document.getElementById("expiry-date");
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Regex for expiry date format (MM/YY)
        if (!expiryDateRegex.test(expiryDateInput.value)) {
            const label = expiryDateInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Validate CVV
        const cvvInput = document.getElementById("cvv");
        const cvvRegex = /^\d{3,4}$/; // Regex for CVV format (3 or 4 digits?)
        if (!cvvRegex.test(cvvInput.value)) {
            const label = cvvInput.previousElementSibling; // Get the label element
            const errorIndicator = label.querySelector(".error-indicator");
            if (!errorIndicator) {
                label.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // Check if card type is selected
        if (!masterImage.classList.contains("selected") && !visaImage.classList.contains("selected")) {
            const masterLabel = masterImage.previousElementSibling; // Get the label element
            const visaLabel = visaImage.previousElementSibling; // Get the label element
            const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
            const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
            if (!masterErrorIndicator) {
                masterLabel.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            if (!visaErrorIndicator) {
                visaLabel.innerHTML += "<span class='error-indicator'> *</span>"; // Add red asterisk to label
            }
            isValid = false;
        }

        // If all input fields are valid, show success message
        if (isValid) {
            alert("Payment has been made!", "");
        
            // Retrieve cart products from local storage
            let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        
            // Retrieve ordered products from local storage
            let orderedProducts = JSON.parse(localStorage.getItem('orderedProducts')) || [];
        
            // Append ordered products to existing array if it exists
            if (orderedProducts.length > 0) {
                orderedProducts = orderedProducts.concat(cartProducts);
            } else {
                orderedProducts = [...cartProducts];
            }
        
            // Save ordered products to local storage
            localStorage.setItem('orderedProducts', JSON.stringify(orderedProducts));
        
            // Delete cart products from local storage
            localStorage.removeItem('cartProducts');
        
            // Redirect to home page after 3 seconds
            setTimeout(function() {
                window.location.href = "Home.html"; 
            }, 3000);
        } else {
            alert("Please enter the details correctly.", "");
        }
    });

    // Card type selection
    masterImage.addEventListener("click", function () {
        masterImage.classList.add("selected");
        visaImage.classList.remove("selected");
        const masterLabel = masterImage.previousElementSibling; // Get the label element
        const visaLabel = visaImage.previousElementSibling; // Get the label element
        const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
        const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
        if (masterErrorIndicator) {
            masterLabel.removeChild(masterErrorIndicator); // Remove asterisk from label
        }
        if (visaErrorIndicator) {
            visaLabel.removeChild(visaErrorIndicator); // Remove asterisk from label
        }
    });

    visaImage.addEventListener("click", function () {
        visaImage.classList.add("selected");
        masterImage.classList.remove("selected");
        const masterLabel = masterImage.previousElementSibling; // Get the label element
        const visaLabel = visaImage.previousElementSibling; // Get the label element
        const masterErrorIndicator = masterLabel.querySelector(".error-indicator");
        const visaErrorIndicator = visaLabel.querySelector(".error-indicator");
        if (masterErrorIndicator) {
            masterLabel.removeChild(masterErrorIndicator); // Remove asterisk from label
        }
        if (visaErrorIndicator) {
            visaLabel.removeChild(visaErrorIndicator); // Remove asterisk from label
        }
    });

    // Update summary based on cart products
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
        subtotalElement.textContent = 'AED ${subtotal.toFixed(2)}';
        shippingElement.textContent = shipping === 0 ? 'Free' : 'AED ${shipping.toFixed(2)}';
        totalElement.textContent = 'AED ${(subtotal + shipping).toFixed(2)}';
        buttonPriceElement.textContent = 'AED ${(subtotal + shipping).toFixed(2)}';
    };

    // Call updateSummary to display the subtotal, shipping, and total on page load
    updateSummary();
});


function handleOfflineCheckout(){
    ProgressiveKITT.addMessage("You are currently offline. To proceed with checkout please go back online ", {hideAfter:2000});

}

function notificationPermission() {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(
            "Order Confirmation",
            {
              body:
              "Your order has been registered. Please check your inbox for more details",
              icon: "/Images/ZenkeyLogoSmall.png",
            }
          );
        });
      }
    });
  }