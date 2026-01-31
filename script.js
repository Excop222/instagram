document.addEventListener("DOMContentLoaded",() => {
    const videos = document.querySelectorAll(".post video");
    let activeVideo = null;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // if another video is playing, pause it
                if (activeVideo && activeVideo !== video) {
                    activeVideo.pause();
                }
                video.play();
                activeVideo = video;
                console.log("Now playing:", video.src);
                animateIcons();
                updateSideIcons(video.closest(".post"));
            }
        });
    },{
        threshold: 0.7
    });
    videos.forEach(video => observer.observe(video));
});
function updateSideIcons(post) {
    document.getElementById("likes").textContent =
    post.dataset.likes;
    document.getElementById("comments").textContent =
    post.dataset.comments;
    document.getElementById("shares").textContent =
    post.dataset.shares;
}
function animateIcons() {
    const inner = document.getElementById("icon-inner");
    if (!inner) {
        console.warn("icon-inner not found");
        return;
    }
    inner.style.transform = "translateY(30px)";
    inner.style.opacity = "0";
    setTimeout(() => {
        inner.style.transform = "translateY(-30px)";
    }, 120);
    setTimeout(() => {
        inner.style.opacity = "1";
        inner.style.transform = "translateY(0)";
    }, 240);
}
const addBtn = document.getElementById('addBtn');
const overlay = document.getElementById('createoverlay');
const closeOverlay = document.getElementById('closeoverlay');
addBtn.addEventListener('click', () => {
    overlay.classList.add('show');
});
closeOverlay.addEventListener('click', () => {
    overlay.classList.remove('show');
});
let startY = 0;
overlay.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
});
overlay.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 80) {
        overlay.classList.remove('show');
    }
});
const pickPhoto = document.getElementById("pickPhoto");
const pickVideo = document.getElementById("pickVideo");
const photoInput = document.getElementById("photoInput");
const videoInput = document.getElementById("videoInput");
pickPhoto.addEventListener("click", () => {
    photoInput.click();
});
pickVideo.addEventListener("click", () => {
    videoInput.click();
});
let selectedFile = null;
let selectedType = null;
photoInput.addEventListener("change", () => {
    selectedFile = photoInput.files[0];
    selectedType = "photo";
    console.log("Photo selected:", selectedFile);
});
videoInput.addEventListener("change", () => {
    selectedFile = videoInput.files[0];
    selectedType = "video";
    console.log("Video selected:", selectedFile);
});
document.addEventListener("DOMContentLoaded", () => {
    const postBtn = document.getElementById("postBtn");
    if (!postBtn) {
        console.error("postBtn not found");
        return;
    }
    postBtn.addEventListener("click", () => {
        console.log("POST DATA:", {
            type: selectedType,
            file: selectedFile,
            caption: captionInput.value
        });
        // Reset (UX)
        captionInput.value = "";
        photoInput.value = "";
        videoInput.value = "";
        selectedFile = null;
        selectedType = null;
        overlay.classList.remove("show");
    });
});
const feed = document.getElementById("feed");
postBtn. addEventListener("click", () => {
    const caption = captionInput.value.trim();
    if (!selectedFile) {
        alert("Select a photo or video first");
        return;
    }
    //Create post
    const post = document.createElement("div");
    post.className = "post";
    // MEDIA
    if (selectedFile) {
        let media;
        if (selectedType === "video") {
            media = document.createElement("video");
            media.controls = true;
            media.muted = true;
            media.autoplay = true;
        } else {
            media = document.createElement("img");
        }
        media.src = URL.createObjectURL(selectedFile);
        media.className = "post-media";
        post.appendChild(media);
    }
    //Caption
    if (caption.trim() !== "") {
        const captionDiv = document.createElement("div");
        captionDiv.className = "post-caption";
        captionDiv.textContent = "caption";
        post.appendChild(captionDiv);
    }
    //Add to feed (Top like TikTok)
    feed.prepend(post);
})
