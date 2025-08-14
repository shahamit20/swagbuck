document.addEventListener("DOMContentLoaded", function () {
    let coin = localStorage.getItem("Earn")

    document.getElementById("total-coins").innerHTML=coin
    document.getElementById("total-coins-display").innerHTML =coin + ' SB'
    let ctx = document.getElementById("activityChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Smile Earnings",
                data: [coin/2, coin*2, 40, 30, 10, 20, 50],
                backgroundColor: "#ff9f00"
            }]
        }
    });

    document.getElementById("total-coins").innerHTML= total 
    document.getElementById("total-coins-display").innerHTML=total
    document.getElementById("survey-total").innerHTML= survey + ' SB'
    document.getElementById("referral-coins").innerHTML = referral + 'SB'
   

    
});
