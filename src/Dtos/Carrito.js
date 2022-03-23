export default class Carrito {
    id
    timestamp
    productos

    constructor(id, timestamp, productos) {
        this.id = id,
        this.timestamp = timestamp,
        this.productos = productos
    }
}