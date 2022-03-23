import ContenedorMongo from "./contenedores/ContenedorMongo.js"


class MensajesDaoMongoDb extends ContenedorMongo {

    constructor() {

        super('mensaje', {
            userid: { type: String},
            date: {type: Date},
            mensaje: {type: String}
        })
    }
}

export default MensajesDaoMongoDb
