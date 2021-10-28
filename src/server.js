const express = require('express');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post("/api/send-email", async (req, res) => {
    try {

        const { firstName, lastName, email, phone, additionalInfo } = req.body;

        console.log(req.body);

        console.log(process.env.NODE_EMAIL)
        console.log(process.env.NODE_PASSWORD)

        const transporter = nodemailer.createTransport({
            host: "leadnationllc.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD,
            },
        });

        const HTMLmessage = `
            <div>
            <p><strong>First Name: </strong>${firstName}</p>
            <p><strong>Last Name: </strong>${lastName}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Phone: </strong>${phone}</p>
            <p><strong>Additional Info: </strong>${additionalInfo}</p>
            </div>
        `

        await transporter.sendMail({
            from: `${firstName} ${lastName} <${email}>`, // sender address
            to: "info@leadnationllc.com", // list of receivers
            subject: "New Email from Career Form", // Subject line
            text: HTMLmessage, // plain text body
            html: HTMLmessage // html body
        });

        return res.status(200).json({ success: true, message: "Email was sent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong with email" })
    }
});



const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server is running on PORT: ${PORT}`));