import admin from 'firebase-admin';
import config from '../../config/config.js';
// -------- Logger config ---------------
import loggerModule from '../../utils/log4js.js'
const logger = loggerModule()


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

console.log('Base Firebase conectada!')
const db = admin.firestore();



class ContenedorFB {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async save(data) {
        // let contador;
        // const querySnapshot = await this.coleccion.get();
        // if (querySnapshot.size>0) {
        //     let docs = querySnapshot.docs;
        //     contador =  docs;
        // }
        let responseFs = await this.coleccion.add(JSON.parse(JSON.stringify(data)));
        // console.log(aver)
        data._id = responseFs.id
        return data;
    }
    async getByid(id) {
        const doc = this.coleccion.doc(`${id}`);
        const item = await doc.get();
        if (item.data()) {
            const response = item.data();
            response._id = id;
            return response;
        }
        return null;

    }
    async getAll() {
        const querySnapshot = await this.coleccion.get();
        let docs = querySnapshot.docs;
        return docs.map((doc)=>{
            let data = doc.data()
            data._id = doc.id;
            return data;
        })
        // console.log(response);
    }
    async update(data) {

        const doc = this.coleccion.doc(`${data._id}`);
        const item = await doc.update(JSON.parse(JSON.stringify(data)));
        logger.debug(item)
        return data;
    }
    async deleteById(id){ 
        const doc = this.coleccion.doc(`${id}`);
        const item = await doc.get()
        if (item.data()) {
            const result = await doc.delete();
            logger.debug(result);
            return true
        }
        return false
    }
    async deleteAll(){
     // version fea e ineficiente pero entendible para empezar
     try {
        const docs = await this.listarAll()
        const ids = docs.map(d => d.id)
        const promesas = ids.map(id => this.borrar(id))
        const resultados = await Promise.allSettled(promesas)
        const errores = resultados.filter(r => r.status == 'rejected')
        if (errores.length > 0) {
            throw new Error('no se borró todo. volver a intentarlo')
        }
    } catch (error) {
        throw new Error(`Error al borrar: ${error}`)
    }
    }
}
export default ContenedorFB