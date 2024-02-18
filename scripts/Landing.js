 //scroll bar flip
 window.addEventListener("scroll", function () {
    var scrollDirection = (window.scrollY > this.lastScroll) ? "down" : "up";
    this.lastScroll = window.scrollY;
    var thumb = document.querySelector("body::-webkit-scrollbar-thumb");

    if (scrollDirection === "up") {
        document.body.style.setProperty("--scroll-gradient-start", "#ff660d");
        document.body.style.setProperty("--scroll-gradient-end", "black");
    } else {
        document.body.style.setProperty("--scroll-gradient-start", "black");
        document.body.style.setProperty("--scroll-gradient-end", "#ff660d");
    }
});

//Navbar smooth scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    const offset = 70;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

//download page animation
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.gaming-icons-container');
    const numIcons = 30; // Number of icons

    for (let i = 0; i < numIcons; i++) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-keyboard';
        icon.style.fontSize = `${Math.floor(Math.random() * 5) + 1}em`; // Randomize icon size
        icon.style.color = '#00000';
        icon.style.position = 'absolute';
        icon.style.left = `${Math.random() * 100}%`; // Randomize horizontal position
        icon.style.top = `${Math.random() * 100}%`; // Randomize vertical position
        container.appendChild(icon);

        animateIcon(icon);
    }
});

function animateIcon(icon) {
    const duration = Math.random() * 10 + 5; // Randomize animation duration (5 to 15 seconds)
    const startX = parseFloat(icon.style.left);
    const startY = parseFloat(icon.style.top);
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;

    icon.animate([
        { left: `${startX}%`, top: `${startY}%` },
        { left: `${endX}%`, top: `${endY}%` }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'linear'
    });
}