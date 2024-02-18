document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    header.innerHTML = `
    <div class="primary-nav">
        <div class="nav-logo">
            <a href="Landing.html">
                <img src="../Images/Logo.jpeg" alt="Logo">
            </a>
        </div>

        <div class="search" id="search">
            <input type="text" class="search-bar" placeholder="Search" id="searchInput">
            <i class="fas fa-search"></i>
        </div>

        <nav>
        <a href="Signup.html">
         Sign Up
        </a>

        <a href="Login.html">
            Login
        </a>
        </nav>


    `;

    // Append CSS styles
    const style = document.createElement('style');
    style.textContent = `
    .primary-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;
        background-color: #231f20;
        width: 100%; 
        flex-wrap: wrap; 
    }    

    .nav-logo {
        margin-left: 20px;
        padding: 5px;
        border-bottom: 2px solid #231f20;
        transition: 0.3s;
    }

    .nav-logo img {
        width: 150px;
        object-fit: contain;
    }

    .nav-logo:hover {
        cursor: pointer;
        border-bottom: 2px solid #ee5417;
    }

    .search {
        display: flex;
        align-items: center;
        padding-right: 20px;
        border: 1px solid #c3c3c3;
        color: #fff;
        border-radius: 25px;
        transition: 0.3s;
        font-family: 'Poppins Regular';
    }

    .search-bar {
        border: none;
        width: 100%;
        background-color: transparent;
        padding: 15px;
        padding-left: 20px;
        width: 300px;
        color: #fff;
        font-family: 'Poppins Regular';
        font-size: 13px;
    }

    .search-bar::placeholder {
        color: #d2d2d2;
        font-family: 'Poppins Regular';
        font-size: 13px;
    }

    .search-bar:focus {
        outline: none;
    }

    .search i {
        color: #fff;
    }

    nav {
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }

    nav a {
        color: #f2f2f2;
        border-bottom: 2px solid transparent;
        text-decoration: none;
        padding: 10px;
        transition: border ease-in-out 0.3s;
    }

    nav a i {
        font-size: 23px;
    }

    nav a:hover {
        border-bottom: 2px solid #ee5417;
    }

    .nav-active {
        border-bottom: 2px solid #ee5417;
    }

    .secondary-nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #ee5417;
    }

    .secondary-nav ul {
        display: flex;
        flex-direction: row;
        list-style: none;
    }

    .secondary-nav ul li a {
        color: #fff;
        text-decoration: none;
        font-family: 'Poppins Regular';
        font-size: 15px;
        transition: 0.3s;
    }

    .secondary-nav ul li {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: 30px;
        border-right: 1px solid #fff;
    }

    .secondary-nav ul li:last-child {
        border-right: none;
    }

    .secondary-nav ul li a:hover {
        color: #000;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #231f20;
        width: 200px;
        border-radius: 15px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        margin-top: 10px;
        margin-left: -10px;
        z-index: 1;
        transition: all ease-in-out 0.5s;
    }

    .dropdown-content a:last-child {
        border-bottom: none;
    }
    
    .dropdown-content a {
        color: #fff;
        padding: 25px;
        text-decoration: none;
        display: block;
        transition: color ease-in-out 0.2s;
        border-bottom: 1px solid #878787;
    }

    .secondary-nav ul li:hover .dropdown-content {
        display: block;
    }

    .secondary-nav ul li:hover .dropdown-content a {
        color: #fff;
    }

    .secondary-nav ul li:hover .dropdown-content a:hover {
        color: #ee5417;
    }

    .sec-nav-active {
        border-bottom: 1px solid #fff;
    }

    .cart-count {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #ff0000;
        font-family: 'Poppins Medium';
        color: white;
        border-radius: 50%;
        font-size: 12px;
        margin-left: 20px;
        margin-top: -37px;
    }
    
    `;
    header.appendChild(style);

    // Set active class for the current page in the primary navbar
    const currentPage = window.location.pathname.split('/').pop();
    const nav = document.querySelector('nav');
    const navLinks = nav.querySelectorAll('a');

    if (currentPage === 'LandingPage.html') {
        const navLogo = document.querySelector('.nav-logo');
        navLogo.classList.add('nav-active');
    }

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-active');
        }

        if (currentPage === 'Checkout.html' && link.getAttribute('href') === 'Cart.html') {
            link.classList.add('nav-active');
        }
    });
});

// Setting the focus and blur events for the search input
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchDiv = document.getElementById('search');

    searchInput.addEventListener('focus', function () {
        searchDiv.style.border = '1px solid #ee5417';
    });

    searchInput.addEventListener('blur', function () {
        searchDiv.style.border = '1px solid #c3c3c3';
    });
});


// Setting filtered product in local storage
document.addEventListener('DOMContentLoaded', function () {
    const secondaryNav = document.querySelector('.secondary-nav');
    const secondaryNavLinks = secondaryNav.querySelectorAll('a');
    secondaryNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            localStorage.setItem('productFiltered', link.textContent);
        });
    });
});


// Set active class for the filtered product in the secondary navbar
document.addEventListener('DOMContentLoaded', function () {
    const secondaryNav = document.querySelector('.secondary-nav');
    const secondaryNavLinks = secondaryNav.querySelectorAll('a');
    secondaryNavLinks.forEach(link => {
        if (link.textContent === localStorage.getItem('productFiltered')) {
            link.classList.add('sec-nav-active');
        }

        if ((localStorage.getItem('productFiltered') === 'Deskpads' ||
            localStorage.getItem('productFiltered') === 'Phone Cases') && link.textContent === 'Accessories') {
            link.classList.add('sec-nav-active');
        }
    });
}
);


// Handling active class for the secondary navbar
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    if ((!currentPage.includes('Products') || !currentPage.includes('Product'))
        && localStorage.getItem('productFiltered') !== null) {
        localStorage.removeItem('productFiltered');
    }
}
);

// Set the cart count indicator
document.addEventListener('DOMContentLoaded', function () {
    // Get the number of cart products from local storage
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const cartCount = cartProducts.length;

    // Find the cart icon link
    const cartLink = document.querySelector('nav a[href="Cart.html"]');

    // Create and append the circle indicator
    const circle = document.createElement('div');
    circle.classList.add('cart-count');
    circle.textContent = cartCount;
    cartLink.appendChild(circle);
});