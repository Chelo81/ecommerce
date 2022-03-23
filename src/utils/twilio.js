import twilio from 'twilio'
// -------- Logger config ---------------
import loggerModule from './log4js.js'
const logger = loggerModule()

const acctSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const twilioClient = twilio(acctSid, authToken)


const enviarSMS = async (to, body) => {
    try {
        const from = process.env.SMS
    const info = await twilioClient.messages.create({ body, from, to })
    logger.info(info)
    } catch (err) {
        logger.error(err)
        throw err;
    }
    
}

const enviarWA = async (para, body) => {
    try {
        const from = `whatsapp:${process.env.WHATSAPP}`
        const to = `whatsapp:${para}`
        const info = await twilioClient.messages.create({ body, from, to })
        logger.info(info)
    } catch (err) {
        logger.error(err)
        throw err;
    }

}


export { enviarSMS, enviarWA }



