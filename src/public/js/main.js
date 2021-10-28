const navbarToggler = document.querySelector('button.nav-toggle');
const navLinks = document.querySelector('.nav__links');

const careerForm = document.querySelector('.career form');


async function sendEmail(e) {
    console.log(e);
    e.preventDefault();

    const firstName = careerForm.first_name.value;
    const lastName = careerForm.last_name.value;
    const email = careerForm.email.value;
    const phone = careerForm.phone.value;
    const additionalInfo = careerForm.additional_info.value;

    const emailData = {
        firstName,
        lastName,
        email,
        phone,
        additionalInfo
    }

    const URL = `${location.protocol}//${location.host}`;
    const response = await fetch(`${URL}/api/send-email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData),
    })

    const data = await response.json();
    console.log(data);

}

careerForm?.addEventListener('submit', sendEmail)

navbarToggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
})

