const nodemailer = require('nodemailer')

const user = process.env.EMAIL
const pass = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user,
        pass
    }
})

module.exports.sendActivationEmail = (user) => {
    transporter.sendMail({
        from: `CRUD POSTS API Arq. de Servidores<${user}>`,
        to: user.email,
        subject: 'Please activate your account',
        html: `
            <h1>Welcome to the Posts API</h1>
            <p>Please activate your account by clicking <a href="http://localhost:8000/api/users/${user.id}/activate">here</a></p>`
    }).then(()=>{
        console.log('email sent')
    }).catch((err) => console.error('error sending email ', err))
}

