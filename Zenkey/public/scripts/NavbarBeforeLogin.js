document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    header.innerHTML = `
    <div class="primary-nav">
        <div class="nav-logo">
            <a href="Landing.html">
                <img src="../Images/Logo.jpeg" alt="Logo">
            </a>
        </div>

        <nav>
            <a href="Login.html">
                Login
            </a>
            <a href="Signup.html">
                Signup
            </a>
        </nav>
    </div>
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
2
    .nav-logo {
        margin-left: 20px;
        padding: 5px;
        border-bottom: 2px solid #231f20;
        transition: 0.3s;
    }

    .nav-logo img {
        margin-left: 20px;
        width: 150px;
        object-fit: contain;
    }

    .nav-logo:hover {
        cursor: pointer;
    }

    nav {
        margin-right: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }

    nav a {
        font-family: 'Poppins Regular';
        font-size: 15px;
        color: #f2f2f2;
        text-decoration: none;
        padding: 14px 25px;
        transition: all ease-in-out 0.3s;
    }

    nav a i {
        font-size: 23px;
    }

    nav a:hover {
        border-bottom: 2px solid #ee5417;
    }
    `;
    header.appendChild(style);

});
