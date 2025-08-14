const blogPosts = [
    { title: "The Future of AI", image: "assets/images/ai-future.jpg", desc: "Discover the latest trends in AI and its impact on society." },
    { title: "How Smile Detection Works", image: "assets/images/smile-detection.jpg", desc: "Explore the technology behind smile recognition in Swagbucks." },
    { title: "Earning Rewards Online", image: "assets/images/rewards.jpg", desc: "Best ways to earn rewards through surveys, referrals, and smiles." },
    { title: "Tech Innovations 2025", image: "assets/images/tech.jpg", desc: "A deep dive into upcoming tech trends that will shape the world." }
];

const perPage = 3;
let currentPage = 1;

function displayBlogs() {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const visibleBlogs = blogPosts.slice(start, end);

    visibleBlogs.forEach(blog => {
        blogContainer.innerHTML += `
            <div class="blog-card">
                <img src="${blog.image}" alt="${blog.title}">
                <h3>${blog.title}</h3>
                <p>${blog.desc}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
    });

    document.getElementById("pageNumber").innerText = currentPage;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) { currentPage--; displayBlogs(); }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(blogPosts.length / perPage)) { currentPage++; displayBlogs(); }
});

displayBlogs();
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
