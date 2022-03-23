import ContenedorFS from "./contenedores/ContenedorFS.js"

class ProductosDaoFS extends ContenedorFS {

    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}

export default ProductosDaoFS
