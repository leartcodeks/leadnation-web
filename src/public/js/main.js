const navbarToggler = document.querySelector('button.nav-toggle');
const navLinks = document.querySelector('.nav__links');

const careerForm = document.getElementById('career-form');
const contactForm = document.getElementById('contact-form');


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toastify(message, isSuccess) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: isSuccess ? "green" : "red"
        }
    }).showToast();
}

async function submitContactForm(e) {
    e.preventDefault();

    const name = escapeHtml(contactForm["name"].value);
    const email = escapeHtml(contactForm["email"].value);
    const message = escapeHtml(contactForm["message"].value);

    const formData = { name, email, message }

    const URL = `${location.protocol}//${location.host}`;
    const response = await fetch(`${URL}/api/contact-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const data = await response.json();
    if (!data.success) {
        return toastify(data.message, data.success)
    }

    toastify(data.message, data.success);
    document.getElementById('contact-form').reset();

}

async function submitCareerForm(e) {
    e.preventDefault();

    const firstName = escapeHtml(careerForm["firstName"].value);
    const lastName = escapeHtml(careerForm["lastName"].value);
    const email = escapeHtml(careerForm["email"].value);
    const phone = escapeHtml(careerForm["phone"].value);
    const additionalInfo = escapeHtml(careerForm["additionalInfo"].value);
    const cvFile = careerForm["cvFile"].files[0];


    const formData = new FormData();
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("additionalInfo", additionalInfo)
    formData.append("cvFile", cvFile)


    formData.forEach(data => console.log(data));
    // return;

    const URL = `${location.protocol}//${location.host}`;
    const response = await fetch(`${URL}/api/career-email`, {
        method: "POST",
        body: formData
    })

    const data = await response.json();
    if (!data.success) {
        return toastify(data.message, data.success)
    }

    toastify(data.message, data.success);
    document.getElementById('career-form').reset();
}

contactForm?.addEventListener('submit', submitContactForm)
careerForm?.addEventListener('submit', submitCareerForm)

navbarToggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
})

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keyup', () => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid')
        }
        else {
            input.classList.remove('is-invalid')
            input.classList.add('is-valid')
        }
    })
})
