import config from '../config/config.js';

let productosDao;
let carritoDao;
let usuariosDao;
let ordenesDao;
let mensajesDao;

switch (process.env.PERS) {
    case 'json':
        const { default: ProductosDaoFS } = await import('./ProductosDaoFS.js')
        productosDao = new ProductosDaoFS( config.fileSystem.path)
        const { default: CarritoDaoFS } = await import('./CarritoDaoFS.js')
        carritoDao = new CarritoDaoFS(config.fileSystem.path)
        const { default: UsuariosDaoFS } = await import('./UsuariosDaoFS.js')
        usuariosDao = new UsuariosDaoFS(config.fileSystem.path)
        const { default: OrdenesDaoFS } = await import('./OrdenesDaoFS.js')
        ordenesDao = new OrdenesDaoFS(config.fileSystem.path)
        const { default: MensajesDaoFS } = await import('./MensajesDaoFS.js')
        mensajesDao = new MensajesDaoFS(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./ProductosDaoFB.js')
        productosDao = new ProductosDaoFirebase()
        const { default: CarritoDaoFirebase } = await import('./CarritoDaoFB.js')
        carritoDao = new CarritoDaoFirebase()
        const { default: UsuariosDaoFirebase } = await import('./UsuariosDaoFB.js')
        usuariosDao = new UsuariosDaoFirebase()
        const { default: OrdenesDaoFirebase } = await import('./OrdenesDaoFB.js')
        ordenesDao = new OrdenesDaoFirebase()
        const { default: MensajesDaoFirebase } = await import('./MensajesDaoFB.js')
        mensajesDao = new MensajesDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb()
        const { default: CarritoDaoMongoDb } = await import('./CarritoDaoMongoDb.js')
        carritoDao = new CarritoDaoMongoDb()
        const { default: UsuariosDaoMongoDb } = await import('./UsuariosDaoMongoDb.js')
        usuariosDao = new UsuariosDaoMongoDb()
        const { default: OrdenesDaoMongoDb } = await import('./OrdenesDaoMongoDb.js')
        ordenesDao = new OrdenesDaoMongoDb()
        const { default: MensajesDaoMongoDb } = await import('./MensajesDaoMongoDb.js')
        mensajesDao = new MensajesDaoMongoDb()
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        productosDao = new ProductosDaoMem()
        const { default: CarritoDaoMem } = await import('./CarritoDaoMem.js')
        carritoDao = new CarritoDaoMem()
        const { default: UsuariosDaoMem } = await import('./UsuariosDaoMem.js')
        usuariosDao = new UsuariosDaoMem()
        const { default: OrdenesDaoMem } = await import('./OrdenesDaoMem.js')
        ordenesDao = new OrdenesDaoMem()
        const { default: MensajesDaoMem } = await import('./MensajesDaoMem.js')
        mensajesDao = new MensajesDaoMem()
        break
}

export {
    productosDao,
    carritoDao,
    usuariosDao,
    ordenesDao,
    mensajesDao
}