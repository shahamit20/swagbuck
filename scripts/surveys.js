document.addEventListener("DOMContentLoaded",()=>{
    let earn = localStorage.getItem("Earn")
console.log(earn)
let coinElement = document.getElementById("total-coins")
coinElement.innerHTML=earn
document.getElementById("coin").innerHTML= `${earn} SB`

let taskBoxes = document.querySelectorAll(".task-box"); 
let taskcount = taskBoxes.length
console.log(`Total Tasks: ${taskcount}`); 
document.getElementById("activity").innerHTML=taskcount

let survey = localStorage.getItem("Surverycount")
document.getElementById("survey").innerHTML=survey

let imagecount =localStorage.getItem("Imagecount")
document.getElementById("image").innerHTML= imagecount

})
const surveyData = [
    {
        image: "assets/images/Consumer.jpg",
        alt: "Consumer Behavior Survey",
        title: "Consumer Behavior Survey",
        description: "🛍️ Share your shopping habits.",
        time: "⏳ Estimated Time: 5 min | 🎁 Earn 50 SB",
        link: "task.html"
    },
    {
        image: "assets/images/tect.jpg",
        alt: "Tech & Innovation Survey",
        title: "Tech & Innovation Survey",
        description: "💡 Share insights on the latest tech trends.",
        time: "⏳ Estimated Time: 7 min | 🎁 Earn 75 SB",
        link: "#"
    },
    {
        image: "assets/images/Healthcare.jpg",
        alt: "Healthcare Survey",
        title: "Healthcare Survey",
        description: "🏥 Your opinion on healthcare services matters.",
        time: "⏳ Estimated Time: 10 min | 🎁 Earn 100 SB",
        link: "#"
    },
    {
        image: "assets/images/game.jpg",
        alt: "Gaming & Entertainment Survey",
        title: "Gaming & Entertainment Survey",
        description: "🎮 Tell us about your favorite games.",
        time: "⏳ Estimated Time: 15 min | 🎁 Earn 125 SB",
        link: "#"
    },
    {
        image: "assets/images/food.jpg",
        alt: "Food & Dining Survey",
        title: "Food & Dining Survey",
        description: "🍽️ Share your favorite restaurants and meals.",
        time: "⏳ Estimated Time: 8 min | 🎁 Earn 80 SB",
        link: "#"
    },
    {
        image: "assets/images/travel.jpg",
        alt: "Travel & Tourism Survey",
        title: "Travel & Tourism Survey",
        description: "✈️ Tell us about your travel experiences.",
        time: "⏳ Estimated Time: 12 min | 🎁 Earn 110 SB",
        link: "#"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    let surveyContainer = document.querySelector(".box");

    surveyContainer.innerHTML = surveyData.map(survey => `
    
        <div class="survey-box">
            <img src="${survey.image}" alt="${survey.alt}">
            <h3>${survey.title}</h3>
            <p>${survey.description}</p>
            <p>${survey.time}</p>
            <a href="${survey.link}" class="btn">Start Survey</a>
        </div>
    `).join('');
});
