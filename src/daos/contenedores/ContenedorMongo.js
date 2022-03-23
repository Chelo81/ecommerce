import mongoose from 'mongoose'
import config from '../../config/config.js'
// -------- Logger config ---------------
import loggerModule from '../../utils/log4js.js'
const logger = loggerModule()


await mongoose.connect(config.mongoDB.connectionString, config.mongoDB.options)

class ContenedorMongo {
    constructor(collectionName, schema) {
        this.model = mongoose.model(collectionName,schema, collectionName);
    }

    async save(data) {   
       return this.model.create(data);
    }
    async getByid(id) {
       let result = await this.model.find({"id": id},{_id:0, __v:0}).lean();
       if (result.length > 0) {
        return result[0];
       } else {
        return  null
       } 
    }
    async getAll() {
        return this.model.find({},{_id:0, __v:0}).lean();
    }
    async update(data) {
     let aver = await this.model.updateOne({"id": data.id},data)
    //  console.log(aver);
     return data;
    }
    async deleteById(id){ 
      let dataDeleted = await this.model.deleteOne({"id":id})
      logger.debug(dataDeleted)
      return (dataDeleted.deletedCount == 1) 
    }
    async deleteAll(){
        let dataDeleted = await this.model.deleteMany({})
        return (dataDeleted.acknowledged)
    }
}

export default ContenedorMongo