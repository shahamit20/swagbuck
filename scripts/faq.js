document.addEventListener("DOMContentLoaded", function () {

    let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;

    let coinElement = document.querySelector(".coins");
    if (coinElement) {
        coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
    }
    const faqs = document.querySelectorAll(".faq-item");

    faqs.forEach((faq) => {
        const question = faq.querySelector(".faq-question");
        const answer = faq.querySelector(".faq-answer");
        const dropBtn = faq.querySelector(".drop-btn");

        question.addEventListener("click", () => {
            answer.style.display = answer.style.display === "block" ? "none" : "block";
            dropBtn.classList.toggle("rotate");
        });
    });
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
