import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Change if your college uses a different SMTP server
    port: 465,                // 465 for SSL, 587 for TLS
    secure: true,             // Use true for port 465, false for other ports
    auth: {
        user: 'shaikja23@iitk.ac.in',
        pass: 'YOUR_PASSWORD_HERE'  // Use your regular password if App Passwords aren't enabled
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails!');
    }
});
