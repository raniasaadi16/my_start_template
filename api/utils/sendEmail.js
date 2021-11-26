const nodemailer = require("nodemailer");
const htmlToText = require('html-to-text');
const hbs = require('nodemailer-handlebars');

module.exports = class Email{
    constructor(email, user, url){
        this.to = email,
        this.firstName = user.firstName,
        this.url = url,
        this.from = process.env.EMAIL
    }

    newTransport() {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMIAL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: `${__dirname}/views/`, 
                partialsDir: `${__dirname}/views/`,
                defaultLayout : '',       
            },
            viewPath: `${__dirname}/views/`
        }));
        return transporter
    }

    // SEND EMAIL FUNCTION 
    async send(template, subject) {
        
        //1 Email options
        let info = {
            from: this.from, 
            to: this.to, 
            subject: subject, 
            text: htmlToText.fromString(template), 
            //text: 'hello',
            template,
            context: {
                firstName: this.firstName,
                url : this.url,
                subject
            }
        
        };
        //2 Create a transport and send email
        await this.newTransport().sendMail(info);
    }

    // SEND WELCOME
    async sendWelcome() {
        await this.send('welcome', 'Welcome to the shopping website!');
    }
    // SEND RESET PASSWORD
    async sendPasswordReset() {
        await this.send(
          'passwordReset',
          'Your password reset token (valid for only 10 minutes)'
        );
    }
    // SEND RESET PASSWORD
    async sendConfirmNewEmail() {
        await this.send(
          'confirmNewEmail',
          'Your confirm email token'
        );
    }
}

