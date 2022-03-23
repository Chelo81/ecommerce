import carrito from '../Negocio/carrito.js'
import productos from '../Negocio/productos.js'
import usuarios from '../Negocio/Usuarios.js';

const crearCarrito = async (req, res) => {
    res.json({ id: await carrito.crearCarrito() });
}

const agregarProductoACarrito = async (req,res,next) => {
    try {
        const carritoId = req.params.idCarrito;
        const productoId = req.body.idProducto;

        const producto =  await productos.getProdById(productoId);
        const carr = await carrito.agregarProdACarrito(carritoId, producto);
        res.json(carr)
    } catch (error) {
        next(error)
    }
}

const quitarProductoDeCarrito = async (req,res,next) => {
    try {
        const carritoId = req.params.idCarrito;
        const productoId = req.params.idProducto;
        const carr = await carrito.quitarProductoDeCarrito(carritoId,productoId);
        res.json(carr)
    } catch (error) {
        next(error)
    }

}

const listarProductos = async (req, res, next) => {
    try {
        const carritoId = req.params.id;
        const prods = await carrito.listarProductos(carritoId);
        res.json(prods)
    } catch (error) {
        next(error)
    }
}

const borrarCarrito = async (req,res,next) => {
    try {
        let id = req.params.id;
        const isOk = await carrito.borrarCarrito(id)
        if (isOk) {
            res.json({mensaje: "Carrito borrado correctamente"})
        } else {
            const mensajeDeError = "Carrito no encontrado";
            throw Error(mensajeDeError)
        }
    } catch (error) {
        next(error)
    } 
}

const mostrarCarritoUsuario = async (req,res,next) => {
    try {
        const userId = req.user;
        const u = await usuarios.buscarUsuarioByName(userId)
        if (!u) {
            throw Error('No se encontro el user')
        }
        const carr = await carrito.mostrarCarrito(u.idCarrito)
        if (!carr) {
            throw Error('No se encontro carrito para el user. No deberia ocurrir')
        }
        res.json(carr)
    } catch (err) {
        next(err)
    }
}

export {
    crearCarrito,
    agregarProductoACarrito,
    quitarProductoDeCarrito,
    listarProductos,
    borrarCarrito,
    mostrarCarritoUsuario
}