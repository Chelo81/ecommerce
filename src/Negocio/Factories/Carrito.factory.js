import CarritoDTO from '../../Dtos/Carrito.js';
import { v4 as uuidv4 } from 'uuid';
import carrito from '../carrito.js';

class CarritoFactory {
    
    static crearCarrito() {
        const prods = [];
        const caaarrito = new CarritoDTO(uuidv4(), Date.now(), prods);
        return caaarrito;
    }
}

export default CarritoFactory