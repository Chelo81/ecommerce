import { mensajesDao } from '../daos/MgrPersistencia.js';
import MensajeFactory from './Factories/Mensaje.factory.js';

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js';
const logger = loggerModule()

const guardarMensaje = async function (data) {

    const mensaje = MensajeFactory.crearMensaje(data);   
    try {
        await mensajesDao.save(mensaje);
    } catch (ex) {
        logger.error(`Error: ${ex}`)
    }
}

const obtenerMensajes = async function () {
    return mensajesDao.getAll();
}

export default { guardarMensaje, obtenerMensajes }