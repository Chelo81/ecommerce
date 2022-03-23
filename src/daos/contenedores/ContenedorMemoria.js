// -------- Logger config ---------------
import loggerModule from '../../utils/log4js.js'
const logger = loggerModule()

class ContenedorMemoria {

    constructor() {
        this.araryElementos = [];
    }

    save(elemento){

        let contador;
        const elementosArr = this.araryElementos;
        if (elementosArr.length>0) {
            contador = elementosArr[elementosArr.length -1]._id;
        } else {
            contador = 0;
        }
        if (!elemento._id) {
            contador++;
            elemento._id = contador;
        }
        elementosArr.push(elemento);
        return elemento;
    }
    getByid(id){
        const elementsArr = this.araryElementos;
        for (let value of elementsArr) {
            if(value._id == id) {
                return value;
            }
        }
        return null;
    }
    getAll(){
        return this.araryElementos;
    }

    update(elemento) {
        let id = elemento._id;
        if (this.deleteById(id)) {
            return this.save(elemento);
        }else {
            throw new Error("Elemento no encontrado para reemplazar"); // No deberiamos salir nunca por acá 
        }
    }
    
    deleteById(id){
        const elementsArr = this.araryElementos;
        let isOk = false;
        for (let i = 0;i< elementsArr.length; i++) {
            if(elementsArr[i]._id == id) {
                elementsArr.splice(i,1);
                isOk = true;
                break;
            }
        }
        return isOk;
    }
    deleteAll(){
        this.araryElementos =[]
        logger.info("Todos los elementos borrados")
    }

}

export default ContenedorMemoria