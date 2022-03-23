//----------- config nodemailer --------------------
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHERAL_MAIL,
    pass: process.env.ETHERAL_PASSWORD
  }
})

//--------------------------------------------------
// -------- Logger config ---------------
import loggerModule from './log4js.js'
const logger = loggerModule()

const defaultHTML = 'Texto predeterminado'

const crearMailOptions = (asunto, cuerpo) => {
    const options = {
        from: 'Proyecto eCommerce',
        to: process.env.ETHERAL_MAIL,
        subject: asunto,
        html: cuerpo || defaultHTML
    }
    return options
  }
  
  const sendEmail = async (asunto, cuerpo) => {
    try {
      const mailOptions = crearMailOptions(asunto,cuerpo);
      const info = await transporter.sendMail(mailOptions)
      logger.debug(info)
    } catch (error) {
      logger.error(err)
    }
  }

export { sendEmail }