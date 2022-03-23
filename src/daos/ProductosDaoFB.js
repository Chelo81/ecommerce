import ContenedorFirebase from "./contenedores/ContenedorFB.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }
}

export default ProductosDaoFirebase
