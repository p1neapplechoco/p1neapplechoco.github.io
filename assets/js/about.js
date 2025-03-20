// Add this to your JavaScript file (e.g., about.js)
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

    // Intersection Observer for section tracking
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update scroll indicator
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.scroll-indicator a').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });

                // Animate section
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    // Observe all sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('.scroll-indicator a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
});

// Intersection Observer for section tracking
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Update scroll indicator
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.scroll-indicator a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });

            // Animate section
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.5 });

// Observe all sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation
document.querySelectorAll('.scroll-indicator a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});