const navbarToggler = document.querySelector('button.nav-toggle');
const navLinks = document.querySelector('.nav__links');

navbarToggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
})