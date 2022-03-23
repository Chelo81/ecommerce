import ContenedorMongo from "./contenedores/ContenedorMongo.js"

class UsuariosDaoMongoDb extends ContenedorMongo {

    constructor() {
        super('Usuarios', {
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            id: { type: String, required: true},
            password: { type: String, required: true},
            edad: { type: Number, required: true },
            foto: { type: String, required: false },
            direccion: { type: String, required: true },
            telefono: { type: Number, required: true},
            idCarrito: {type: String, required: false}
        })
    }
}

export default UsuariosDaoMongoDb

