import ContenedorFirebase from "./contenedores/ContenedorFB.js"

class UsuariosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('usuarios')
    }
}

export default UsuariosDaoFirebase
