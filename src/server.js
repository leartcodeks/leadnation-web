const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

app.post("/send-email", (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.send("Error sending email");
    }
    return res.send('Email send')
});


const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server is running on PORT: ${PORT}`));