import { promises } from 'fs';
// -------- Logger config ---------------
import loggerModule from '../../utils/log4js.js'
const logger = loggerModule()

class ContenedorFS {

    constructor(file) {
        this.file = file;
    }

    async save(elemento){

        let contador;
        const contenidoObj =  await this.getAll();
        if (contenidoObj.length>0) {
            contador = contenidoObj[contenidoObj.length -1]._id;
        } else {
            contador = 0;
        }
        if (!elemento._id) {
            contador++;
            elemento._id = contador;
        }
        contenidoObj.push(elemento);
        try {
            await promises.writeFile(this.file,JSON.stringify(contenidoObj, null, 2))
            // console.log("Finalizamos 'save'");
            return elemento;
        } catch (error) {
            throw new Error(`Error al intentar escribir el archivo ${this.file}`);
        }
    }
    async getByid(id){
        const elementsArr = await this.getAll();
        for (let value of elementsArr) {
            if(value._id == id) {
                return value;
            }
        }
        return null;
    }
    async getAll(){
        try {
            const contenidoStr = await promises.readFile(this.file, 'utf-8');
            // console.log("Leimos correctamente");
            if (contenidoStr.length > 0) {
                return JSON.parse(contenidoStr);
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    async update(elemento) {
            let id = elemento._id;
            if (await this.deleteById(id)) {
                return this.save(elemento);
            }else {
                throw new Error("Elemento no encontrado para reemplazar"); // No deberiamos salir nunca por acá 
            }
    }
    
    async deleteById(id){
        const elementsArr = await this.getAll();
        let isOk = false;
        for (let i = 0;i< elementsArr.length; i++) {
            if(elementsArr[i]._id == id) {
                elementsArr.splice(i,1);
                isOk = true;
                break;
            }
        }
        if (isOk) {
            try {
                await promises.writeFile(this.file,JSON.stringify(elementsArr, null, 2))
                logger.info("Borrado Ok");
            } catch (error) {
                throw new Error(`Error al intentar escribir el archivo ${this.file}`);
            }
        } else {
            logger.warn("Elemento no encontrado");
        }
        return isOk;
    }
    async deleteAll(){
        try {
            await promises.unlink(this.file);
            logger.info("Todos los elementos borrados")
        }catch (error) {
                throw new Error(`Error al intentar borrar el archivo ${this.file}`);
        }
    }

}

export default ContenedorFS