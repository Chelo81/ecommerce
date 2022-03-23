import ContenedorFS from "./contenedores/ContenedorFS.js"

class OrdenesDaoFS extends ContenedorFS {

    constructor(rutaDir) {
        super(`${rutaDir}/ordenes.json`)
    }
}

export default OrdenesDaoFS
