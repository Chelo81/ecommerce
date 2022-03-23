import ProductoDTO from '../../Dtos/Producto.js';
import { v4 as uuidv4 } from 'uuid';

class ProductoFactory {
    
    static crearProducto(data) {
        let stock;
        if(data.stock != null && data.stock != undefined && data.stock > 0) {
            stock = data.stock;
        } else {
            stock = 1;
        }
        return new ProductoDTO(uuidv4(), data.nombre, data.codigo, data.descripcion, data.precio, data.foto, Date.now(), stock);
    }
}

export default ProductoFactory