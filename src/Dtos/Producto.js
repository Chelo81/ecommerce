export default class Producto {
    id
    nombre
    codigo
    descripcion
    precio
    foto
    timestamp
    stock

    constructor(id, nombre, codigo, descripcion, precio, foto, timestamp, stock) {
        this.id = id,
        this.nombre = nombre,
        this.codigo = codigo,
        this.descripcion = descripcion,
        this.precio = precio,
        this.foto = foto,
        this.timestamp = timestamp,
        this.stock = stock
    }
}