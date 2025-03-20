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
            // Check if the explorer window is displaying the CV
            const explorerContent = document.getElementById("explorer-text");
            const pdfEmbed = explorerContent.querySelector("embed");

            if (pdfEmbed && pdfEmbed.src.includes("NguyenThienAn_CV.pdf")) {
                // Create a temporary link to download the CV
                const a = document.createElement("a");
                a.href = pdfEmbed.src;
                a.download = "NguyenThienAn_CV.pdf"; // Name of the downloaded file
                a.click();
            } else {
                // Default behavior: Download text content
                const text = explorerContent.innerText;
                const blob = new Blob([text], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "response.txt";
                a.click();
                URL.revokeObjectURL(url);
            }
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
    const userInput = document.getElementById("user-input").value.toLowerCase(); // Convert input to lowercase
    const explorerWindow = document.getElementById("explorer-window");
    const explorerContent = document.getElementById("explorer-text");
    const explorerTitle = document.querySelector(".explorer-title"); // Get the title element

    if (userInput === "") return;

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Show the explorer window
    explorerWindow.classList.remove("hidden");
    explorerWindow.classList.add("show");

    // Clear previous content
    explorerContent.innerHTML = "";

    // Simple NLP-like keyword matching
    if (userInput.includes("cv") || userInput.includes("resume")) {
        // Update the title
        explorerTitle.textContent = "My CV";

        // Display a PDF in the explorer window
        const pdfEmbed = document.createElement("embed");
        pdfEmbed.src = "assets/NguyenThienAn_CV.pdf"; // Path to your PDF file
        pdfEmbed.type = "application/pdf";
        pdfEmbed.width = "100%";
        pdfEmbed.height = "500px"; // Adjust height as needed
        explorerContent.appendChild(pdfEmbed);
    } else if (userInput.includes("projects") || userInput.includes("work")) {
        // Update the title
        explorerTitle.textContent = "My Projects";

        explorerContent.textContent = "Here are some of my projects:\n\n1. Project A\n2. Project B\n3. Project C";
    } else if (userInput.includes("contact") || userInput.includes("email")) {
        // Update the title
        explorerTitle.textContent = "You can contact me at these details:\n\nEmail: ngthienaans@gmail.com\nPhone: +84 911 105 675";

        explorerContent.textContent = "You can contact me at:\n\nEmail: your.email@example.com\nPhone: +123 456 7890";
    } else if (userInput.includes("about") || userInput.includes("who are you")) {
        // Update the title
        explorerTitle.textContent = "About Me";

        explorerContent.textContent = "I'm An (Thien) Nguyen, a passionate developer with experience in AI (currently in NLP), development, and more!";
    } else {
        // Update the title
        explorerTitle.textContent = "Answer from An";

        explorerContent.textContent = "I'm sorry, I didn't understand that. Can you please rephrase? (Try asking about my CV, projects, or contact info)";
    }
}