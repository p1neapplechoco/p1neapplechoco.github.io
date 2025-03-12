document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle Functionality
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.body.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    // Input Handling
    document.getElementById("user-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleInput();
    });

    // Explorer Window Functionality
    const explorerWindow = document.getElementById("explorer-window");
    const exitBtn = document.getElementById("exit-btn");
    const minimizeBtn = document.getElementById("minimize-btn");
    const copyBtn = document.getElementById("copy-btn");
    const downloadBtn = document.getElementById("download-btn");

    if (exitBtn) {
        exitBtn.addEventListener("click", () => {
            explorerWindow.classList.remove("show");
            explorerWindow.classList.add("hidden");
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener("click", () => {
            // Implement minimize functionality if needed
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const text = document.getElementById("explorer-text").innerText;
            navigator.clipboard.writeText(text);
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            const text = document.getElementById("explorer-text").innerText;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "response.txt";
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Dragging Functionality
    let isDragging = false;
    let offsetX, offsetY;

    const header = document.querySelector(".explorer-header");
    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - explorerWindow.offsetLeft;
        offsetY = e.clientY - explorerWindow.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            explorerWindow.style.left = `${e.clientX - offsetX}px`;
            explorerWindow.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Resizing Functionality
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    const resizeHandle = document.createElement("div");
    resizeHandle.style.width = "10px";
    resizeHandle.style.height = "10px";
    resizeHandle.style.background = "transparent";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.right = "0";
    resizeHandle.style.bottom = "0";
    resizeHandle.style.cursor = "se-resize";
    explorerWindow.appendChild(resizeHandle);

    resizeHandle.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(explorerWindow).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(explorerWindow).height, 10);
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            explorerWindow.style.width = `${newWidth}px`;
            explorerWindow.style.height = `${newHeight}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isResizing = false;
    });
});

function handleInput() {
    const userInput = document.getElementById("user-input").value;
    const explorerWindow = document.getElementById("explorer-window");
    const explorerText = document.getElementById("explorer-text");

    if (userInput === "") return;

    explorerWindow.classList.remove("hidden");
    explorerWindow.classList.add("show");

    const text = "Hello"; // Replace with dynamic content in the future
    explorerText.textContent = text;

    document.getElementById("user-input").value = "";
}