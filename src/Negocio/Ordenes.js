import { ordenesDao } from "../daos/MgrPersistencia.js";
import { enviarSMS, enviarWA }  from '../utils/twilio.js';
import {sendEmail} from '../utils/nodemailer.js'
import OrdenFactory from './Factories/Ordenes.factory.js'

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const notificarCompra = async (user, unaOrden) => {
    
    let cuerpoMensaje ="<html><h3>Lista de Productos</h3><br>"
    unaOrden.productos.forEach(myFunction)
 
    function myFunction(value, index, array) {
       cuerpoMensaje += ` Producto: ${value.nombre} - Precio: ${value.precio} - Cantidad: ${value.cantidad} <br>`; 
    }
    cuerpoMensaje += "</html>"
    const asunto = `Nuevo pedido de ${user.nombre} ${user.apellido} (${user.id})`
    try {
        const status = await sendEmail(asunto, cuerpoMensaje)
        logger.debug(status)
        await enviarWA(`+549${user.telefono}`, asunto);
        await enviarSMS(`+54${user.telefono}`, "Su pedido se encuentra en proceso.")
    } catch (err) {
        logger.warn('Ocurrio un error al notificar la orden')
        return false
    }
    return true
}

const obtenerDatosProds = (listaProductos) => {
    const listaProd = []
    // creamos un nuevo array con los valores requeridos del producto
    listaProductos.forEach(element => {
        let cant =  listaProductos.filter((x) => element.nombre == x.nombre).length;
        if (listaProd.filter((x) => x.nombre == element.nombre).length == 0) {
            listaProd.push({
                nombre: element.nombre,
                precio: element.precio,
                cantidad: cant
            })
        }
    });
    return listaProd
}

const guardarOrden = async (userId, listaProductos) => {
    const unaOrden = OrdenFactory.crearOrden(userId, obtenerDatosProds(listaProductos))
    const resultado = await ordenesDao.save(unaOrden)
    return resultado
}

export default {
    notificarCompra,
    obtenerDatosProds,
    guardarOrden
}