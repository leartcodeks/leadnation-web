const navbarToggler=document.querySelector("button.nav-toggle"),navLinks=document.querySelector(".nav__links"),careerForm=document.querySelector(".career form");async function sendEmail(e){console.log(e),e.preventDefault();const a={firstName:careerForm.first_name.value,lastName:careerForm.last_name.value,email:careerForm.email.value,phone:careerForm.phone.value,additionalInfo:careerForm.additional_info.value},o=`${location.protocol}//${location.host}`,n=await fetch(`${o}/api/send-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),r=await n.json();console.log(r)}careerForm?.addEventListener("submit",sendEmail),navbarToggler.addEventListener("click",(()=>{navLinks.classList.toggle("active")}));