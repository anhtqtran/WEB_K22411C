// Chuyển Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Hiển thị popup và overlay
function togglePopup(id) {
    const popup = document.getElementById(id);
    const overlay = document.getElementById("overlay");

    // Đóng tất cả popup trước khi mở popup mới
    document.querySelectorAll(".popup").forEach(p => p.style.display = "none");

    // Kiểm tra nếu popup đang mở thì đóng lại, nếu chưa mở thì mở
    if (popup.style.display === "block") {
        popup.style.display = "none";
        overlay.style.display = "none";
    } else {
        popup.style.display = "block";
        overlay.style.display = "block";
    }
}

// Đóng popup khi bấm ra ngoài hoặc nhấn nút đóng
function closePopup() {
    document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
    document.getElementById("overlay").style.display = "none";
}
