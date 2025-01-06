// front end javascript for hero section slider
const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.slider-control.next');
const prevButton = document.querySelector('.slider-control.prev');
let currentSlide = 0;

// Show slide by index
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Automatic Slide
function startAutoSlider() {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000); // Change slide every 5 seconds
}

// Manual Controls
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Initialize
if (slides.length > 0) {
    showSlide(currentSlide);
    startAutoSlider();
}



// some card style
const btnBlocks = document.querySelectorAll('.btn-block');
const icons = document.querySelectorAll('#icon');

btnBlocks.forEach((btnBlock, index) => {
    const icon = icons[index]; // Get the corresponding icon for each button

    btnBlock.addEventListener('mouseover', () => {
        icon.classList.add('advance-icon');
    });

    btnBlock.addEventListener('mouseout', () => {
        icon.classList.remove('advance-icon');
    });
});
