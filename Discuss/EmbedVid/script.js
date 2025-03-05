// Ẩn loading spinner khi video tải xong
document.getElementById("video-frame").onload = function() {
    document.querySelector(".loading-spinner").style.display = "none";
};
