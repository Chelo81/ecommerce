import express, { json, urlencoded } from 'express';
import jwt from '../utils/jwt.js'
import ordenesController from '../controllers/ordenes.js'
import controllerMensajes from '../controllers/mensajes.js'

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const { Router } = express

const routerChat = new Router();

routerChat.use(json());
routerChat.use(urlencoded({extended: true}))
routerChat.use(express.static('./public'));


// Para loguear el uso del router
routerChat.use(function timeLog (req, res, next) {
    logger.info(`${req.method} a '${req.originalUrl}': ${new Date()}`)
    next()
})

//chat
routerChat.get('/', controllerMensajes.getMensajes)

routerChat.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

export default routerChat;