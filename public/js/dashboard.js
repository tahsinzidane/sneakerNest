const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

navLinks.style.display = 'none'

menuToggle.addEventListener('click', () => {
    // console.log('hello world')
    if (navLinks.style.display === 'none') {
        navLinks.style.display = 'block'
    } else {
        navLinks.style.display = 'none'
    }
})

// all btns
const uploadBtn = document.getElementById('uploadBtn');
const setupLP = document.getElementById('setupLP');
const allUsers = document.getElementById('allUsers');
const allProducts = document.getElementById('allProducts');

// all sections
const uploadForm = document.getElementById('uploadForm');
const landingPageSetup = document.getElementById('landingPageSetup');
const userTable = document.getElementById('userTable');
const productCard = document.getElementById('productCard');


let areas = [uploadForm, landingPageSetup, userTable, productCard];

areas.forEach(areas => {
    areas.style.display = 'none'
})