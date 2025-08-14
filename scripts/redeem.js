let currentCoins = 3500;

let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;

let coinElement = document.querySelector(".coins");
if (coinElement) {
    coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
}

function openRedeemDetails(type) {
    document.getElementById("redeem-modal").classList.add("active");
    document.getElementById("redeem-title").innerText = type.toUpperCase() + " Redeem";
    document.querySelectorAll(".redeem-btn").forEach(btn => {
        let cost = parseInt(btn.getAttribute("data-coins"));
        btn.disabled = cost > currentCoins;
    });
}

function closeRedeemDetails() {
    document.getElementById("redeem-modal").classList.remove("active");
}

function redeem(amount) {
    if (currentCoins >= amount) {
        currentCoins -= amount;
        document.getElementById("coin-balance").innerText = currentCoins;
        alert("Redemption Successful!");
        closeRedeemDetails();
    } else {
        alert("Not enough coins!");
    }
}

document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", function () {
        let answer = this.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

document.getElementById("redeem-btn").addEventListener("click", function () {
    openRedeemDetails("coin");
});

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page filename
    let navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.parentElement.classList.add("active"); // Add class to parent <li>
        }
    });
});
