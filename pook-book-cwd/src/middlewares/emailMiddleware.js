require('dotenv').config();
const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    secure:true,
    port:465,
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASSWORD
    }
})

//verify connection configuration


const registerUserTemplate = (user) => {
  const from = process.env.EMAIL;
  const to = user.email;
  const subject = "🚀 Register Account Successfully 🚀";
  const html = `
  <p>Dear, ${user.name} </p>
  <p>Thank you for registering for shopping at our store </p>
  <p>Your username is: ${user.email} </p>
  <p>If you have any questions please contact support</p>
  <p>Best regards,</p>
  <p>Your friend CodingwithVudang 🚀</p>
  <img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622100868/sz4scfp9eit31cqy8xnf.jpg" alt="logo" width="500" height="500" > 
  `;

  return { from, to, subject, html };
};


export {
    transporter,
    registerUserTemplate
};