// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark
    document.body.setAttribute("data-theme", savedTheme);

    // Add Enter key support
    document.getElementById("user-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleInput();
    });
});

// Toggle theme on button click
document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// Handle input submission
function handleInput() {
    const input = document.getElementById("user-input").value.trim();
    const responseWindow = document.getElementById("response-window");
    const responseText = document.getElementById("response-text");

    if (input === "") return;

    // Reset the response window
    responseWindow.classList.remove("show");
    responseWindow.classList.add("hidden");
    responseText.textContent = ""; // Clear previous text

    // Show the response window with fade effect
    responseWindow.classList.remove("hidden");
    setTimeout(() => {
        responseWindow.classList.add("show");
    }, 10); // Small delay to trigger the transition

    // Word-by-word animation
    const text = "Hello World";
    const words = text.split(" ");
    let index = 0;

    function displayWord() {
        if (index < words.length) {
            responseText.textContent += (index > 0 ? " " : "") + words[index];
            index++;
            setTimeout(displayWord, 300); // 300ms delay between words
        }
    }

    setTimeout(displayWord, 500);

    // Reset input
    document.getElementById("user-input").value = "";
}