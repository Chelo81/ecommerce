import UsuarioDTO from '../../Dtos/Usuario.js';
import usuarios from '../Usuarios.js';

class UsuariosFactory {
    
    static crearUsuario(data) {
        const pass = usuarios.createHash("" + data.password)
        const foto = "/images/perfil_vacio.jpg"
        const u = new UsuarioDTO(data.username, data.nombre, data.apellido, foto, data.edad, data.direccion, data.telefono, pass, null);
        // const idCarrito = await usuarios.addCarrito()
        return u;
        // return new UsuarioDTO(data.username, data.nombre, data.apellido, foto, data.edad, data.direccion, data.telefono, pass, idCarrito);
    }
}

export default UsuariosFactory