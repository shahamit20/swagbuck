document.addEventListener("DOMContentLoaded", function () {
    const save = localStorage.getItem("User")
    let userobj = JSON.parse(save)
    document.querySelector(".pop-conter").innerHTML=`<h2>Welcome to Swagbucks, ${userobj.username}! </h2>
            <p>You've just earned 50 SB Coins. Let the journey begin 🚀</p>`
     if (localStorage.getItem("justLoggedIn") === "true") {
        localStorage.removeItem("justLoggedIn"); // Remove flag after showing
        document.querySelector(".pop").style.display="flex"
        setTimeout(() => {
            document.querySelector(".pop").style.display="none"
        }, 2000);
    }
    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showTestimonial() {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(-${index * 100}%)`;
        });
        index = (index + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 5000);
});
let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;

let coinElement = document.querySelector(".coins");
if (coinElement) {
    coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
}

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page filename
    let navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.parentElement.classList.add("active"); // Add class to parent <li>
        }
    });
});
