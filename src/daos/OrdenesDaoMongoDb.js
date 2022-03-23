import ContenedorMongo from "./contenedores/ContenedorMongo.js"

const schemaProductos = {
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    cantidad: {type: Number, required: false}
}
                                
class OrdenesDaoMongoDb extends ContenedorMongo {

    constructor() {
        super('Ordenes', {
            id: { type: String, required: true },
            fecha: { type: Date, required: true },
            estado: { type: String, required: true},
            propietario: { type: String, required: true },
            productos: [schemaProductos]
        })
    }
}

export default OrdenesDaoMongoDb

