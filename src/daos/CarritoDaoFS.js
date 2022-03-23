import ContenedorFS from "./contenedores/ContenedorFS.js"

class CarritoDaoFS extends ContenedorFS {

    constructor(rutaDir) {
        super(`${rutaDir}/carrito.json`)
    }
}

export default CarritoDaoFS
