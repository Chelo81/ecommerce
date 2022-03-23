import ContenedorFirebase from "./contenedores/ContenedorFB.js"

class OrdenesDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('ordenes')
    }
}

export default OrdenesDaoFirebase
