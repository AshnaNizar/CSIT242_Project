document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <div class="footer-nav">
            <div class="footer-logo">
                <a href="Home.html">
                    <img src="../images/Logo.jpeg" alt="Logo">
                </a>
            </div>

            <div class="footer-links">
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                </ul>
            </div>

        </div>
    `;

    // Append CSS styles
    const style = document.createElement('style');
    style.textContent = `
    .footer-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;
        background-color: #231f20;
        width: 100%;
        height: 300px;
        color: #fff;
    }
    
    .footer-logo {
        margin-left: 120px;
        padding: 5px;
        border-bottom: 2px solid #231f20;
        transition: 0.3s;
    }
    
    .footer-logo img {
        width: 150px;
        object-fit: contain;
    }
    
    .footer-logo:hover {
        cursor: pointer;
        border-bottom: 2px solid #ee5417;
    }
    
    .footer-links {
        padding-right:50px;
        flex-grow: 1; /* Allow the footer links to grow and take up remaining space */
        text-align: right; /* Center-align the footer links */
    }
    
    .footer-links ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .footer-links ul li {
        display: inline-block;
        margin-right: 20px;
    }
    
    .footer-links ul li:last-child {
        margin-right: 0;
    }
    
    .footer-links ul li a {
        color: #fff;
        text-decoration: none;
    }
    
    `;
    footer.appendChild(style);
});
