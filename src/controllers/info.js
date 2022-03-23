import { getInfo as obtenerInfo } from '../Negocio/info.js'
// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const info = (req,res) => {
    const info = obtenerInfo()
    res.render('partials/info', {info})
}

const log = (req,res) => {
    const info = obtenerInfo()
    logger.info(`Objeto info: ${JSON.stringify(info)}`)
    res.render('partials/info', {info})
}

export {
    info, 
    log
}