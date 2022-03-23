import OrdenDTO from '../../Dtos/Orden.js';
import { v4 as uuidv4 } from 'uuid';

class OrdenFactory {
    
    static crearOrden(userId, productosInfo ) {
        const status = "Generada"
        return new OrdenDTO(uuidv4(), Date.now(), status, userId, productosInfo);
    }
}

export default OrdenFactory