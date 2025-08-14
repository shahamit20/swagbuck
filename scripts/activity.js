document.addEventListener("DOMContentLoaded", () => {
    const activity = document.querySelector(".activity");
    const coin = localStorage.getItem("Earn");
    let money = localStorage.getItem("suvary");
    let coinElement = document.querySelector(".coins");
    if (coinElement) {
        coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${coin} SB</span>`;
    }
    
    // Fallback value if "suvary" is not set
    if (!money) {
        money = 100;
        localStorage.setItem("suvary", money); // Optional: save default
    }

    const newElement = document.createElement("div");

    if (coin) {
        newElement.innerHTML = `
            <h2>Earn from Selfies</h2>
            <p>${coin} SB</p>`;
    } else {
        newElement.innerHTML = `
            <h2>Earn from Surveys</h2>
            <p>${money} SB</p>`;
    }

    if (activity) {
        activity.appendChild(newElement);
    } else {
        console.warn("Element with class 'activity' not found.");
    }
});
