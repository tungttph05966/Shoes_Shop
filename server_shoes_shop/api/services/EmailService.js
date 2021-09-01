const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: '',
    port: 587,
    // secure: true,
    auth: {
        user:'',
        pass:''
    }
});

module.exports = {
    sendMail: (receiver, subject, html) => new Promise(async (resolve, reject) => {
        try {
            let info = await smtpTransport.sendMail({
                from: '',
                to: receiver,
                subject,
                html,
            });

            console.log("Message sent: ", info);

			resolve();
        } catch (error) {
            console.log(error);
			reject({
                message: "Hệ thống không gửi được email cho bạn ngay lúc này, vui lòng thử lại sau!",
            });
        }
    }),
}