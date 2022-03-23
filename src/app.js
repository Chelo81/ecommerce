import express, { json, urlencoded } from 'express';
import routerProductos from './router/routerProductos.js';
import routerCarrito from './router/routerCarrito.js';
import routerHome from './router/home.js';
import routerChat from './router/routerChat.js';
import routerUsuarios from './router/routerUsuarios.js';
import handlebars from 'express-handlebars';
import usuariosController from './controllers/usuarios.js'
import routerInfo from './router/routerInfo.js';
import chatHandler from './router/ws.js'

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import cors from 'cors';

// -------- Logger config ---------------
import loggerModule from './utils/log4js.js'
const logger = loggerModule()

const app = express();
const httpServer = new HttpServer(app);
const io =  new Socket(httpServer);


io.on('connection', async socket => {
   logger.debug("Usuario conectado")
   chatHandler(socket, io.sockets)
})

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}))
app.use(express.static('./public'));
app.use('/images', express.static('images'));

// ---------- config handlebars -----------------
app.engine('hbs', handlebars.engine({
   extname: ".hbs",
     defaultLayout: "index.hbs",
     layoutsDir: "./src/views/layouts",
     partialsDir: "./src/views/partials"
   }))
app.set('views', './src/views')
app.set('view engine', 'hbs')
 // ---------- config handlebars -----------------

app.post('/register', usuariosController.registrar)

app.post('/login', usuariosController.login)

app.use('/home', routerHome)

app.use('/chat', routerChat)

app.use('/info', routerInfo)

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/usuarios', routerUsuarios)

// Capturamos cualquier peticion que no este manejada
app.use((req, res, next) => {
   try {
      const mje ="Path Error"
      throw Error(mje);
   } catch (error) {
      next(new Error())
   }
})

app.use((err, req, res, next) => {
   res.status(404).json({ error: -2, description: `ruta '${req.url}' metodo '${req.method}' no implementada` })
 })

 export default httpServer