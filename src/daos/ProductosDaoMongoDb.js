import ContenedorMongo from "./contenedores/ContenedorMongo.js"

class ProductosDaoMongoDb extends ContenedorMongo {

    constructor() {
        super('productos', {
            id: { type: String, required: true },
            nombre: { type: String, required: true },
            codigo: { type: Number, required: true },
            descripcion: { type: String, required: true },
            precio: { type: Number, required: true },
            foto: { type: String, required: true},
            timestamp: { type: Date, required: false},
            stock: { type: Number, required: false}
        })
    }
}

export default ProductosDaoMongoDb

