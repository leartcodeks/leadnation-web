const express = require('express');
const path = require('path');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({ limits: { fileSize: 1 * 1024 * 1024 } }));

app.use(express.static(path.join(__dirname, 'public')));

app.post("/api/contact-email", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!email) return res.status(400).json({ success: false, message: "Please provide your email" });

        if (!message) return res.status(400).json({ success: false, message: "Please provide a message" });

        const plainTextMessage = `Name: ${name}, Email: ${email}, Message: ${message}`

        const HTMLmessage = `
            <div>
            <p><strong>Name: </strong>${name}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
            </div>
        `

        const transporter = nodemailer.createTransport({
            host: "leadnationllc.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: email, // sender address
            to: "info@leadnationllc.com", // list of receivers
            subject: "New submission from Contact Form", // Subject line
            text: plainTextMessage, // plain text body
            html: HTMLmessage, // html body
        });

        return res.status(200).json({ success: true, message: "Email was sent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong. Plese try again" })
    }
})

app.post("/api/career-email", async (req, res) => {
    try {

        const { firstName, lastName, email, phone, additionalInfo } = req.body;
        const cvFile = req.files ? req.files.cvFile : undefined;

        if (!firstName) {
            return res.status(400).json({ success: false, message: "Please provide first name" });
        }
        if (!lastName) {
            return res.status(400).json({ success: false, message: "Please provide last name" });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: "Please provide email" });
        }
        if (!cvFile) {
            return res.status(400).json({ success: false, message: "Please provide your CV" });
        }

        const plainTextMessage = `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone: ${phone}, Additional Info: ${additionalInfo}`

        const HTMLmessage = `
            <div>
            <p><strong>First Name: </strong>${firstName}</p>
            <p><strong>Last Name: </strong>${lastName}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Phone: </strong>${phone}</p>
            <p><strong>Additional Info: </strong>${additionalInfo}</p>
            </div>
        `;

        const transporter = nodemailer.createTransport({
            host: "leadnationllc.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `${firstName} ${lastName} <${email}>`, // sender address
            to: "hr@leadnationllc.com", // list of receivers
            subject: "New submission from Career Form", // Subject line
            text: plainTextMessage, // plain text body
            html: HTMLmessage, // html body
            attachments: [
                {
                    filename: cvFile?.name,
                    content: cvFile?.data,
                }
            ]
        });

        return res.status(200).json({ success: true, message: "Email was sent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong. Please try again" })
    }
});



const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server is running on PORT: ${PORT}`));