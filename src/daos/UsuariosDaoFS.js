import ContenedorFS from "./contenedores/ContenedorFS.js"

class UsuariosDaoFS extends ContenedorFS {

    constructor(rutaDir) {
        super(`${rutaDir}/usuarios.json`)
    }
}

export default UsuariosDaoFS
