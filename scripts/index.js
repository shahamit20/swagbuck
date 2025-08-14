document.addEventListener("DOMContentLoaded", () => {
    let earnings = localStorage.getItem("Earn") ? parseInt(localStorage.getItem("Earn")) : 0;
    let but = document.getElementById("but");
    let captureButton = document.getElementById("capture");
    let video = document.getElementById("vid");
    let canvas = document.createElement("canvas");
    let saveDiv = document.getElementById("save");
    let mediaDevices = navigator.mediaDevices;
    let closeButton = document.getElementById("close");
    document.querySelector(".selfies-section").style.display = "block";


    document.getElementById("earnings").innerText = earnings + " SB";
    let coinElement = document.querySelector(".coins");
    if (coinElement) {
        coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
    }

    // Load saved images from localStorage
    let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    savedImages.forEach(imageData => {
        addImageToSaveDiv(imageData);
    });

    but.addEventListener("click", () => {
        console.log("start");
        document.querySelector(".camera-container").style.display = "block";
        captureButton.style.display = "block";
        closeButton.style.display = "block";

        // Show camera feed
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => console.error("Camera error:", err));

        // Load face-api.js models
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ]).then(() => {
            console.log("Models loaded successfully");
            startVideo();
        });

        function startVideo() {
            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    video.srcObject = stream;
                })
                .catch(err => console.error(err));
        }

        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.querySelector(".camera-container").append(canvas);

            video.addEventListener("loadedmetadata", () => {
                const displaySize = { width: video.videoWidth, height: video.videoHeight };
                faceapi.matchDimensions(canvas, displaySize);
                canvas.width = displaySize.width;
                canvas.height = displaySize.height;
            });

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()


                const displaySize = { width: video.videoWidth, height: video.videoHeight };
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                const ctx = canvas.getContext("2d");

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                resizedDetections.forEach(detection => {
                    const box = detection.detection.box;
                    const expressions = detection.expressions;

                    // Default color is blue
                    let boxColor = "red";
                    let labelColor = "red";
                    captureButton.disabled = true;
                    captureButton.style.background = "rgb(151 126 126)";

                    // If the "happy" probability is greater than 0.5, change to green
                    if (expressions.happy > 0.5) {
                        boxColor = "green";
                        labelColor = "green";
                        captureButton.disabled = false;
                        captureButton.style.background = "firebrick";
                    }

                    // Draw bounding box
                    ctx.strokeStyle = boxColor;
                    ctx.lineWidth = 3;
                    ctx.strokeRect(box.x, box.y, box.width, box.height);

                    // Draw label with probability
                    ctx.fillStyle = labelColor;
                    ctx.font = "16px Arial";
                    ctx.fillText(`😊 Happy (${expressions.happy.toFixed(2)})`, box.x, box.y - 10);
                });

                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
        });




    });

    closeButton.addEventListener("click", () => {
        if (window.currentStream) {
            let tracks = window.currentStream.getTracks();
            tracks.forEach(track => track.stop());
        }
        video.srcObject = null;
        document.querySelector(".camera-container").style.display = "none";
        captureButton.style.display = "none";
        closeButton.style.display = "none";
    });

    captureButton.addEventListener("click", () => {
        let lastCaptureTime = localStorage.getItem("lastCaptureTime");

        let currentTime = new Date().getTime(); // Get current timestamp in milliseconds
        let twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (lastCaptureTime && currentTime - lastCaptureTime < twentyFourHours) {
            document.querySelector(".alert").classList.remove("alert2");
            document.getElementById("closs-alert").addEventListener("click", () => {
                document.querySelector(".alert").classList.add("alert2");
            })
            return;
        }

        document.querySelectorAll(".pop").forEach(element => {
            element.classList.remove("pop1");
            element.classList.add("pop");
        });
        setTimeout(() => {
            document.querySelectorAll(".pop").forEach(element => {
                element.classList.remove("pop");
                element.classList.add("pop1");
            });
        }, 3000);

        document.querySelector(".selfies-section").style.display = "block";
        let context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        let imageData = canvas.toDataURL("image/png");
        let timestamp = new Date().toLocaleString();

        addImageToSaveDiv(imageData, timestamp);

        savedImages.unshift({ imageData, timestamp });
        localStorage.setItem("savedImages", JSON.stringify(savedImages));

        // Save the current time as the last captured time
        localStorage.setItem("lastCaptureTime", currentTime);

        earnings += 50;
        localStorage.setItem("Earn", earnings);
        document.getElementById("earnings").innerText = earnings + " SB";
        coin = 50

        if (coinElement) {
            coinElement.innerHTML = `<span class="coins" id="coin">&#x1F4B0; ${earnings} SB</span>`;
        }
    });

    // Function to add image with timestamp
    function addImageToSaveDiv(imageData, timestamp) {
        let div = document.createElement("div");
        div.className = "image-container";

        let img = document.createElement("img");
        img.src = imageData;
        img.className = "saved-image";

        // Tooltip for timestamp
        let tooltip = document.createElement("span");
        tooltip.className = "tooltip";
        tooltip.innerText = `${timestamp}`;

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () {
            div.remove();
            savedImages = savedImages.filter(imgObj => imgObj.imageData !== imageData);
            localStorage.setItem("savedImages", JSON.stringify(savedImages));
        };

        div.appendChild(img);
        div.appendChild(tooltip);
        div.appendChild(deleteBtn);
        saveDiv.prepend(div);
    }

    // Load saved images on refresh
    function loadSavedImages() {
        let savedImagesData = JSON.parse(localStorage.getItem("savedImages")) || [];
        savedImagesData.forEach(imgObj => {
            addImageToSaveDiv(imgObj.imageData, imgObj.timestamp);
        });
    }

    // Run function on page load
    window.onload = loadSavedImages;

    let imagecount = document.querySelectorAll(".image-container").length
    localStorage.setItem("Imagecount", imagecount)

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







