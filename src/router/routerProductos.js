import express, { json, urlencoded } from 'express';
const { Router } = express
import { obtenerProd, buscarProdById, guardarProducto, actualizarProducto, eliminarProducto } from '../controllers/productos.js';
import usuariosController from '../controllers/usuarios.js'
import jwt from '../utils/jwt.js'

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

const routerProd = new Router();


routerProd.use(json());
routerProd.use(urlencoded({extended: true}))


// Para loguear el uso del router
routerProd.use(function timeLog (req, res, next) {
    logger.info(`${req.method} a '${req.originalUrl}': ${new Date()}`)
    next()
  })

// Get Products
routerProd.get('/', obtenerProd);

// Get Product by id
routerProd.get('/:id', buscarProdById)

// routerProd.use(usuariosController.verificarPermisos)

// Agregar Producto
routerProd.post('/', jwt.auth, usuariosController.verificarPermisos, guardarProducto)

// modificar producto
routerProd.put('/:id', jwt.auth, usuariosController.verificarPermisos, actualizarProducto)

// eliminar producto
routerProd.delete('/:id', jwt.auth, usuariosController.verificarPermisos, eliminarProducto)

routerProd.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

export default routerProd;