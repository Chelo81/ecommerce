export default class Orden {
    id
    fecha
    estado
    propietario
    productos

    constructor(id, fecha, estado, propietario, productos){
        this.id = id,
        this.fecha = fecha,
        this.estado = estado,
        this.propietario = propietario,
        this.productos = productos
    }
}