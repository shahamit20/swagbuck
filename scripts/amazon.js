let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;

let coinElement = document.querySelector(".coins");
if (coinElement) {
    coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
}
document.addEventListener("DOMContentLoaded", function () {
    let coin = parseInt(localStorage.getItem("Earn")) || 0; // Get user's coin balance
    console.log("User Coins:", coin);

    let redeemButtons = document.querySelectorAll(".redeem-btn");

    redeemButtons.forEach(button => {
        let sbValue = parseInt(button.textContent.split(" ")[0]); // Extract SB value from button text

        if (!isNaN(sbValue)) {
            if (coin >= sbValue) {
                button.style.background = "e40d38"; // Enough coins
                button.disabled = false;
            } else {
                button.style.background = "#6e6e6e"; // Not enough coins
                button.disabled = true; // Disable button
                  button.style.cursor = "not-allowed"
            }

            // Add click event listener
            button.addEventListener("click", () => {
                if (button.disabled) return; // Prevent click if button is disabled

                if (coin >= sbValue) {
                    let popconten = document.querySelector(".popup-content");
                    button.disabled = false; // Ensure button remains enabled after clicking

                    if (popconten) {
                        popconten.classList.remove("pop");
                    }

                    document.getElementById("close-popup").addEventListener("click", () => {
                        popconten.classList.add("pop");
                    });

                } else {
            
                }
            });
        }
    });
});


