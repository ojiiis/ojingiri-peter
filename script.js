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

function resizeGridItem(item) {
    // The '10' here must match the 'grid-auto-rows' value in your CSS
    const grid = document.querySelector(".grid-section");
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    
    // Calculate how many rows the content needs
    const rowSpan = Math.ceil((item.querySelector('.img-wrapper').getBoundingClientRect().height + item.querySelector('h3').getBoundingClientRect().height + 20) / (rowHeight + rowGap));
    
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    const allItems = document.getElementsByClassName("art-card");
    for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}

// Run when images are fully loaded
window.onload = resizeAllGridItems;
// Run when window is resized (to keep it responsive)
window.addEventListener("resize", resizeAllGridItems);

// Also run when each image loads individually (prevents layout shift)
document.querySelectorAll('.art-card img').forEach(img => {
    img.addEventListener('load', () => {
        const card = img.closest('.art-card');
        resizeGridItem(card);
    });
});