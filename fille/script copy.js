document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Visual feedback for toggle
        menuToggle.style.opacity = nav.classList.contains('active') ? "0.5" : "1";
    });

    // 2. Simple Scroll Reveal
    const reveal = () => {
        const cards = document.querySelectorAll('.art-card, .hero-content');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    };

    // Initial styles for reveal
    document.querySelectorAll('.art-card, .hero-content').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', reveal);
    reveal(); // Run once on load
});