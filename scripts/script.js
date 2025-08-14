document.addEventListener("DOMContentLoaded", () => {

    // Load userdata.json and store in localStorage
    fetch('scripts/userdata.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('userData', JSON.stringify(data));
            console.log('Data stored in localStorage:', data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Button click handler
    document.getElementById("btn").addEventListener("click", (event) => {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Get stored userData
        let userDataJSON = localStorage.getItem("userData");
        let userData = JSON.parse(userDataJSON);

        // Check if user exists in userData
        let userExists = userData.some(user => user.email === email && user.password === password);

        if (userExists) {
            // Do not add points if user exists
            let earn = parseInt(localStorage.getItem("Earn")) || 0;
            console.log("User exists. Earn remains:", earn);

            localStorage.setItem("justLoggedIn", "true");
            window.location.href = "home.html";

        } else {
            // First-time user: give 50 points
            let earn = parseInt(localStorage.getItem("Earn")) || 0;
            earn += 50;
            localStorage.setItem("Earn", earn);

            console.log("New user. 50 points added. Total Earn:", earn);

            localStorage.setItem("justLoggedIn", "true");
            window.location.href = "home.html";
        }

        // Optional: Store current user session
        let userSession = {
            email: email,
            password: password
        };
        localStorage.setItem("User", JSON.stringify(userSession));
    });
});
