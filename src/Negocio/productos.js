import { productosDao } from '../daos/MgrPersistencia.js'
import ProductFactory from './Factories/Productos.factory.js'

const guardarProducto = async (data) => {
    const producto = await productosDao.save(ProductFactory.crearProducto(data));
    return producto;
}

const obtenerProd = async () => {
    const productos = await productosDao.getAll();
    return productos
}

const obtenerProdWeb = async function (req, res) {
    const productos = await productosDao.getAll();
    return productos;
}


const getProdById = async (id) => {
    try {
        const prod = await productosDao.getByid(id);
        if (prod != null) {
            return prod
        } else {
            const mensajeDeError = "Producto no encontrado";
            throw Error(mensajeDeError)
        }
    } catch (err) {
        throw err;
    }
}

const actualizarProducto = async (id, nProd) => {
    try {
        const prod = await getProdById(id);
        nProd.id = id;
        nProd.timestamp = prod.timestamp;
        let resultado = await productosDao.update(nProd)
        return resultado
    } catch (error) {
        throw error;
    }
}

const eliminarProducto = async (id) => {
    try {
        const isOk = await productosDao.deleteById(id)
        return isOk;
    } catch (error) {
        throw error;
    } 
}

export default { getProdById, guardarProducto, obtenerProd, actualizarProducto, eliminarProducto, obtenerProdWeb }