// Function to add a product to the cart and handle the events when the "Add to Cart" button is clicked
function addToCart(productId) {
    // Load cartProducts from local storage or set it to an empty array if it doesn't exist
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // Check if the product is already in the cart
    const index = cartProducts.findIndex(item => item.id === productId);
    if (index !== -1) {
        // If the product is already in the cart, increase its quantity
        cartProducts[index].quantity++;
    } else {
        // If the product is not in the cart, add it with quantity 1
        const product = products.find(item => item.id === productId);
        if (product) {
            cartProducts.push({ ...product, quantity: 1 });
        }
    }

    // Update the cartProducts in local storage
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

    // Show the pop-up
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);

    // Find the button that was clicked
    const addButton = document.querySelector(`button[data-product-id="${productId}"]`);

    // Change the button icon to a tick icon
    addButton.innerHTML = `
      <i class="fa-solid fa-check-circle cart-icon fa-lg"></i>
      Added to Cart
    `;

    // Change the button color to green
    addButton.style.backgroundColor = 'green';

    // Disable the button
    addButton.disabled = true;

    // Revert back to the original state after 3 seconds
    setTimeout(() => {
        addButton.innerHTML = `
        <i class="fa-solid fa-cart-plus cart-icon fa-lg"></i>
        Add to Cart
      `;
        addButton.style.backgroundColor = '';
        addButton.disabled = false;
    }, 3000);
}

// Display the products on the page
// This code will run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the productGrid element
    const productGrid = document.getElementById('productGrid');

    // Loop through the products array and generate HTML for each product
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Set the innerHTML of the productDiv
        productDiv.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="Product Image" class="product-image">
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})" data-product-id="${product.id}">
          <i class="fa-solid fa-cart-plus cart-icon fa-lg"></i>
          Add to Cart
        </button>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      `;

        // Append the productDiv to the productGrid
        productGrid.appendChild(productDiv);
    });
});
