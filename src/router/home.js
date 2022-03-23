import express, { json, urlencoded } from 'express';
import jwt from '../utils/jwt.js'
import ordenesController from '../controllers/ordenes.js'

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const { Router } = express

const routerHome = new Router();

routerHome.use(json());
routerHome.use(urlencoded({extended: true}))


// Para loguear el uso del router
routerHome.use(function timeLog (req, res, next) {
    logger.info(`${req.method} a '${req.originalUrl}': ${new Date()}`)
    next()
  })

routerHome.post('/comprar', jwt.auth, ordenesController.cerrarOrden)

routerHome.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

export default routerHome;