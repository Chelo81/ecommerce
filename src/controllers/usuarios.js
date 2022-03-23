import usuarios from '../Negocio/Usuarios.js'
import UserFactory from '../Negocio/Factories/Usuarios.factory.js'
import jwt from '../utils/jwt.js'
import {sendEmail} from '../utils/nodemailer.js';
import carrito from '../Negocio/carrito.js';

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const registrar = async (req, res) => {

    const u = await usuarios.buscarUsuarioByName(req.body.username)
    if (!u) {
        let newUser = UserFactory.crearUsuario(req.body)

        const idCarrito = await carrito.crearCarrito()
        newUser.idCarrito = idCarrito;

        const user = await usuarios.registrarUser(newUser);
        const status = sendEmail("Nuevo registro", `Nuevo usuario ${newUser.id} creado`)
        logger.debug(status)
        
        // creamos el token
        const access_token = jwt.generateToken(user.id)
        res.json(access_token)
    } else {
        res.status(401).json({error:'El usuario ya existe.'})
    }
    
}


const login = async (req, res) => {
    
    const u = await usuarios.buscarUsuarioByName(req.body.username)

    if (!u) {
        return res.json({ error: 'credenciales invalidas' });
    } else {
        if (!usuarios.isValidPassword(u.password, "" + req.body.password)) {
            res.status(401).json({ error: 'credenciales invalidas' });
        } else {
             // creamos el token
            const access_token = jwt.generateToken(u.id)
            res.json(access_token)
        }
    }
}

const subirAvatar = async (req,res,next) => {
    const file = req.file
    const u = await usuarios.buscarUsuarioByName(req.user)
    if (!file) {
       const error = new Error('Error subiendo archivo')
       error.httpStatusCode = 400
       return next(error)
    }
    const filenamePath = `/images/${req.user}-${file.originalname}`
    u.foto = filenamePath;
    usuarios.addPicture(u)
    // res.redirect('/home')
    res.json({ status: "Foto actualizada"})
 }

 const verificarPermisos =  (req, res, next) => {
    try{
        if (usuarios.isAdmin(req.user)) {
            next();
        } else {
            throw Error(`ruta '${req.baseUrl}' metodo '${req.method}' no autorizada. Solo el admin puede ejecutar este metodo`)
        }
    }catch (err) {
        next(err)
    }
}
  

export default { 
    registrar,
    login,
    subirAvatar,
    verificarPermisos
}