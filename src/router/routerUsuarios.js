import express, { json, urlencoded } from 'express';
import multer from 'multer';
import jwt from '../utils/jwt.js'
import usuariosController from '../controllers/usuarios.js'

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const { Router } = express

/* ------------------------------------------------------ */
/* Multer config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
  
//---------------------------------------------------------
 
const routerUsuarios = new Router();

routerUsuarios.use(json());
routerUsuarios.use(urlencoded({extended: true}))
 
 
// Para loguear el uso del router
routerUsuarios.use(function timeLog (req, res, next) {
    logger.info(`${req.method} a '${req.originalUrl}': ${new Date()}`)
    next()
})

routerUsuarios.post('/upload-picture', jwt.auth, upload.single('miArchivo'), usuariosController.subirAvatar)

routerUsuarios.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

export default routerUsuarios;