import express, { json, urlencoded } from 'express';
const { Router } = express
import {crearCarrito, agregarProductoACarrito, quitarProductoDeCarrito, listarProductos, borrarCarrito, mostrarCarritoUsuario } from '../controllers/carrito.js';

// -------- Logger config ---------------
import loggerModule from '../utils/log4js.js'
const logger = loggerModule()

import jwt from '../utils/jwt.js'


const routerCarrito = new Router();


routerCarrito.use(json());
routerCarrito.use(urlencoded({extended: true}))

// Para loguear el uso del router
routerCarrito.use(function timeLog (req, res, next) {
  logger.info(`${req.method} a '${req.originalUrl}': ${new Date()}`)
    next()
  })
  
//get carrito del user
routerCarrito.get('/', jwt.auth, mostrarCarritoUsuario)

// Crear carrito
routerCarrito.post('/', jwt.auth, crearCarrito)

// Borrar carrito
routerCarrito.delete('/:id', jwt.auth, borrarCarrito)

// Listar productos del carrito
routerCarrito.get('/:id/productos', jwt.auth, listarProductos);

// Agregar Producto al carrito
routerCarrito.post('/:idCarrito/productos', jwt.auth, agregarProductoACarrito)

// Borrar carrito
routerCarrito.delete('/:idCarrito/productos/:idProducto', jwt.auth, quitarProductoDeCarrito)


routerCarrito.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

export default routerCarrito;