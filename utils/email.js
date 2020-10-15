/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const config = require("../config");

// Dev Mail Server: https://mailtrap.io/inboxes/1025540/messages
const sendEmailDev = async options => {
    // 1. create a transporter
    const transporter = nodemailer.createTransport({
        host: config.email.host,
        //port: config.development.email.port,
        auth: {
            user: config.email.address,
            pass: config.email.password
        }
    });

    // 2. define email options
    const mailOptions = {
        from: "Expresso App <expressoapp.2020@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html: options.html
    };

    // 3. send email
    await transporter.sendMail(mailOptions);
};

const sendEmailProd = async options => {
     // 1. create a transporter
     const transporter = nodemailer.createTransport({
        service: config.email.host,
        auth: {
            user: config.email.address,
            pass: config.email.password
        }
        // ACTIVATE in Gmail "less secure app" option
        // https://nodemailer.com/usage/using-gmail/
    });

    // 2. define email options
    const mailOptions = {
        from: "Expresso App <expressoapp.2020@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html: options.html
    };

    // 3. send email
    await transporter.sendMail(mailOptions);
};

const sendEmail = async options => {
    if(process.env.NODE_ENV === "production") {
        await sendEmailProd(options);
    } else {
        await sendEmailDev(options);
    }
};

module.exports = sendEmail;