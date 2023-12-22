import nodemailer from "nodemailer"
import User from "@/lib/model/UserModel"
import bcrypt from "bcrypt"

export const sendEmail = async({email, emailType,userId}:any)=>{
    try {
        // create a hased Token
       const hashedToken = await bcrypt.hash(userId.toString(), 10)

       
       if(emailType === "VERIFY"){
           await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        // create a Transpoter
        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS,
              // TODO: add these credentials to .env file
            }
          });

          const mailOptions = {
            from: 'webxgrafix@gmail.com',
            to: email,
            subject: emailType == "VERIFY" ? "Verify your email" : "Reset your password",
            html:`<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your brower. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

          }

          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse;
          
    } catch (error: any) {
        throw new Error(error.message)
    }
}   