import ContenedorMongo from "./contenedores/ContenedorMongo.js"


class CarritoDaoMongoDb extends ContenedorMongo {

    constructor() {
        const subSchemaProducto = {
            id: { type: String, required: true },
            nombre: { type: String, required: true },
            codigo: { type: Number, required: true },
            descripcion: { type: String, required: true },
            precio: { type: Number, required: true },
            foto: { type: String, required: true},
            timestamp: { type: Date, required: false},
            stock: { type: Number, required: false}
        }
        super('carrito', {
            id: { type: String, required: true },
            timestamp: { type: Date, required: true},
            productos: [subSchemaProducto]
        })
    }
}

export default CarritoDaoMongoDb
