// Scroll Animations
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight / dividend);
};

const elementOutOfView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > window.innerHeight;
};

const toggleScrollAnimation = () => {
    for (let i = 0; i < scrollElements.length; i++) {
        const element = scrollElements[i];

        if (elementInView(element, 1.25)) {
            element.classList.add('active');
        } else if (elementOutOfView(element)) {
            element.classList.remove('active');
        }
    }
};

window.addEventListener('scroll', toggleScrollAnimation);
toggleScrollAnimation();

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});



// Get references to the portfolio container, items, and navigation buttons
const portfolioContainer = document.querySelector('.portfolio-container');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// Function to determine the middle item and apply the 'active' class
const setMiddleItemActive = () => {
    // Calculate the center position of the visible area
    const containerCenter = portfolioContainer.scrollLeft + portfolioContainer.offsetWidth / 2;

    let closestItem = null;
    let minDistance = Infinity;

    // Loop through each portfolio item to find the closest to the center
    portfolioItems.forEach(item => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestItem = item;
        }
    });

    // Remove active class from all items
    portfolioItems.forEach(item => item.classList.remove('active'));

    // Add active class to the closest (middle) item
    if (closestItem) {
        closestItem.classList.add('active');
    }
};

// Initialize the active item on page load
document.addEventListener('DOMContentLoaded', () => {
    setMiddleItemActive(); // Initially set the middle item as active
});

// Function to handle sliding to the next item
const slideNext = () => {
    portfolioContainer.scrollBy({
        left: portfolioItems[0].offsetWidth + 20, // Scroll by one item width + gap
        behavior: 'smooth'
    });

    setMiddleItemActive(); // Recalculate and apply active class
};

// Function to handle sliding to the previous item
const slidePrev = () => {
    portfolioContainer.scrollBy({
        left: -(portfolioItems[0].offsetWidth + 20), // Scroll by negative value for previous
        behavior: 'smooth'
    });

    setMiddleItemActive(); // Recalculate and apply active class
};

// Mouse movement effect for auto-scrolling based on mouse position
portfolioContainer.addEventListener('mousemove', (e) => {
    const containerWidth = portfolioContainer.offsetWidth;
    const mouseX = e.clientX;

    // Check if the mouse is on the left or right side of the container
    if (mouseX < containerWidth * 0.1) {
        // Mouse is near the left side, trigger scroll to the previous portfolio
        slidePrev();
    } else if (mouseX > containerWidth * 0.9) {
        // Mouse is near the right side, trigger scroll to the next portfolio
        slideNext();
    }
});

// Add event listeners for prev/next button click
prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);

// Recalculate middle item on window resize
window.addEventListener('resize', () => {
    setMiddleItemActive(); // Ensure the middle item is recalculated on resize
});
