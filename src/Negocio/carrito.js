import  {productosDao, carritoDao }  from '../daos/MgrPersistencia.js'
import CarritoFactory from './Factories/Carrito.factory.js'

const crearCarrito = async () => {
    const carrito = await carritoDao.save(CarritoFactory.crearCarrito());
    return carrito.id;
}

const agregarProdACarrito = async (carritoId, producto) => {
    try{
        const carrito = await carritoDao.getByid(carritoId);
        if (carrito != null) {
            carrito.productos.push(producto)
            const resultado = await carritoDao.update(carrito);
            return resultado;
        } else {
            const mensajeDeError = "El carrito no existe";
            throw Error(mensajeDeError)
        }
    } catch (error) {
        throw error
    }
}

const vaciarCarrito = async (id) => {
    try {
        let carrito = await carritoDao.getByid(id);
        if (carrito != null) {
            carrito.productos = []
            try {
                await carritoDao.update(carrito);
                return true
            } catch (e) {
                return false
            }
        }else {
            throw Error("El carrito a vaciar no existe")
        }
    } catch (err) {
        throw err
    }
}


const quitarProductoDeCarrito = async (idCarrito, idProducto) => {
    try {
        let carrito = await carritoDao.getByid(idCarrito);
        let isOk = false;
        if (carrito != null) {
            for (let i=0; i < carrito.productos.length; i++) {
                if (carrito.productos[i].id == idProducto) {
                    // console.log("entramos")
                    carrito.productos.splice(i,1);
                    isOk = true;
                    break;
                }
            }
            if (isOk) {
                await carritoDao.update(carrito);
                // await carritoDao.deleteById(carritoId);
                // carrito = await carritoDao.save(carrito);
                // res.json(carrito)
                return carrito
            } else {
                const mensajeDeError = "El id de producto no existe";
                throw Error(mensajeDeError)
            }
        } else {
            const mensajeDeError = "El carrito no existe";
            throw Error(mensajeDeError)
        }
    } catch (error) {
        throw error;
    }

}

const mostrarCarrito = async (id) => {
    try {
        const carrito = await carritoDao.getByid(id);
        return carrito
    } catch (error) {
        throw error
    }
}

const listarProductos = async (id) => {
    try {
        const carrito = await carritoDao.getByid(id);
        if (carrito) {
            return carrito.productos
        } else {
            const mensajeDeError = "Carrito no encontrado";
            throw Error(mensajeDeError)
        }

    } catch (error) {
        throw error
    }
}

const listarProductosWeb = async (id) => {
    let carrito = await carritoDao.getByid(id);
    if (carrito) {
        return carrito.productos
    } else {
        return []
    }
}

const borrarCarrito = async (id) => {
    try {
        const isOk = await carritoDao.deleteById(id)
        return isOk
    } catch (error) {
        throw error
    } 
}

export default { crearCarrito, agregarProdACarrito, borrarCarrito, listarProductos, quitarProductoDeCarrito, listarProductosWeb, mostrarCarrito, vaciarCarrito }
