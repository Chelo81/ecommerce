import ContenedorFS from "./contenedores/ContenedorFS.js"

class MensajesDaoFS extends ContenedorFS {

    constructor(rutaDir) {
        super(`${rutaDir}/mensajes.json`)
    }
}

export default MensajesDaoFS
