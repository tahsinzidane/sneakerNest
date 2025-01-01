const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const sidebarClossBtn = document.getElementById('closs');

navLinks.style.display = 'none'

menuToggle.addEventListener('click', () => {
    // console.log('hello world')
    if (navLinks.style.display === 'none') {
        navLinks.style.display = 'block'
    } else {
        navLinks.style.display = 'none'
    }
})

sidebarClossBtn.addEventListener('click', () => {
    // console.log('hello world');
    navLinks.style.display = 'none'

})

// well this is not working, i'll do it later
/*
if (navLinks.style.display === 'block') {
    document.body.addEventListener('click', (e) => {
        // Check if the click is outside the navLinks
        if (!navLinks.contains(e.target)) {
            navLinks.style.display = 'none';
        }
    });
}
*/

// All buttons
const uploadBtn = document.getElementById('uploadBtn');
const setupLP = document.getElementById('setupLP');
const allUsers = document.getElementById('allUsers');
const allProducts = document.getElementById('allProducts');

// All sections
const uploadForm = document.getElementById('uploadForm');
const landingPageSetup = document.getElementById('landingPageSetup');
const userTable = document.getElementById('userTable');
const productCard = document.getElementById('productCard');

// Array of all sections
const areas = [uploadForm, landingPageSetup, userTable, productCard];

// Hide all sections by default
areas.forEach(area => {
    area.style.display = 'none';
});

// Function to hide all sections
const hideAllAreas = () => {
    areas.forEach(area => {
        area.style.display = 'none';
    });
};

// Dynamic sidebar logic
const dynamicSidebar = () => {
    // Show the upload form and hide others
    uploadBtn.addEventListener('click', () => {
        hideAllAreas();
        uploadForm.style.display = 'block';
    });

    // Show the landing page setup and hide others
    setupLP.addEventListener('click', () => {
        hideAllAreas();
        landingPageSetup.style.display = 'block';
    });

    // Show the user table and hide others
    allUsers.addEventListener('click', () => {
        hideAllAreas();
        userTable.style.display = 'block';
    });

    // Show the product card and hide others
    allProducts.addEventListener('click', () => {
        hideAllAreas();
        productCard.style.display = 'block';
    });
};

// Initialize the dynamic sidebar
dynamicSidebar();
