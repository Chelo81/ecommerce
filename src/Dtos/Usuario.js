export default class Usuario {
    id
    nombre
    apellido
    foto
    edad
    direccion
    telefono
    password
    idCarrito

    constructor(id, nombre, apellido, foto, edad, direccion, tel, pass, idCarrito) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.foto = foto
        this.edad = edad
        this.direccion = direccion
        this.telefono = tel
        this.password = pass
        this.idCarrito = idCarrito
    }
}