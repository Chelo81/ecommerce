import { usuariosDao } from '../daos/MgrPersistencia.js';
import carrito from './carrito.js';
import config from '../config/config.js'


const Users = usuariosDao;
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

const registrarUser = (user) => {
    return Users.save(user);
}

const buscarUsuarioByName = (username) => {
    return Users.getByid(username)
}

const createHash = (data) => {
    return hashSync(data, genSaltSync(10), null)
}

const isValidPassword = (userPassword, password) => {
    return compareSync(password, userPassword)
}

const addCarrito = async () => {
    
    let idCarrito = await carrito.crearCarrito();
    return idCarrito;
    // user.idCarrito = idCarrito;
    // const u = await Users.update(user);
    // return u;
}

const addPicture = async (user) => {
    return Users.update(user);
}

const isAdmin = (userid) => {
    if(config.adminUser == userid) {
        return true;
    }else {
        return false;
    }
}

export default {
    registrarUser,
    buscarUsuarioByName,
    createHash,
    isValidPassword,
    addCarrito,
    addPicture,
    isAdmin
}