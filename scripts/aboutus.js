document.addEventListener("DOMContentLoaded", function () {
    let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;

let coinElement = document.querySelector(".coins");
if (coinElement) {
    coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
}
    let teamBoxes = document.querySelectorAll(".team-box");
    let currentIndex = 0;

    function showTeamMembers() {
        // Hide all team members
        teamBoxes.forEach((box) => box.classList.add("hidden"));

        // Show next 3 members
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % teamBoxes.length;
            teamBoxes[index].classList.remove("hidden");
        }

        // Update index for next cycle
        currentIndex = (currentIndex + 3) % teamBoxes.length;
    }

    // Initial display
    showTeamMembers();

    // Change team members every 5 seconds
    setInterval(showTeamMembers, 5000);
});