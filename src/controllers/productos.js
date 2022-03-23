import productos from '../Negocio/productos.js'

const guardarProducto = async (req, res) => {
    res.json(await productos.guardarProducto(req.body))
}

const obtenerProd = async function (req, res) {
    res.json(await productos.obtenerProd());
}

const buscarProdById = async (req, res, next) => {
    try {
        let id = req.params.id;
        const prod = await productos.getProdById(id);
        res.json(prod)
    } catch (err) {
        next(err);
    }
}

const actualizarProducto = async (req,res,next) => {
    try {
        let id = req.params.id;
        let nProd = req.body;
        const prod = await productos.actualizarProducto(id, nProd);
        res.json(prod);
    } catch (error) {
        next(error)
    }
}

const eliminarProducto = async (req,res,next) => {
    try {
        let id = req.params.id;
        const isOk = await productos.eliminarProducto(id)
        if (isOk) {
            res.json({mensaje: "Elemento borrado correctamente"})
        } else {
            const mensajeDeError = "Producto no encontrado";
            throw Error(mensajeDeError)
        }
    } catch (error) {
        next(error)
    } 
}

export {
    guardarProducto,
    obtenerProd,
    buscarProdById,
    actualizarProducto,
    eliminarProducto
}