import users from '../Negocio/Usuarios.js';
import carrito from '../Negocio/carrito.js';
import ordenes from '../Negocio/Ordenes.js'


// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const cerrarOrden = async (req,res,next) => {
   
    const u = await users.buscarUsuarioByName(req.user)
    const prodCarrito = await carrito.listarProductosWeb(u.idCarrito);

    const unaOrden = await ordenes.guardarOrden(u.id, prodCarrito)

    //Limpiamos el carrito
    try {
        if (await carrito.vaciarCarrito(u.idCarrito)) {
            const carritoVacio = await carrito.mostrarCarrito(u.idCarrito)
            if (carritoVacio.productos.length == 0) {
                logger.debug("Carrito vacio confirmando. Operacion ok")
            } else {
                throw Error("No se pudo limpiar el carrito del usuario")
            }
        } else {
            throw Error("No se pudo limpiar el carrito del usuario")
        }
        
        if (ordenes.notificarCompra(u, unaOrden)) {
            res.json({status: "Orden realizada correctamente"})
        } else {
            res.json({status: "WARN: No se pudo notificar el cierre de la orden"})
        }

    }catch (err) {
        next(err)
    }

}

export default {
    cerrarOrden
}