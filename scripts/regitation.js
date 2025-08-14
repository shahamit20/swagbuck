document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const userData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value,
            age: document.getElementById("age").value
        };
        console.log(userData)
        localStorage.setItem("User",JSON.stringify(userData))
        window.location = 'login.html'
    });
})