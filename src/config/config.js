import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config();

export default {
    fileSystem: {
        path: './DB'
    },
    mongoDB : {
        connectionString : process.env.MONGODB,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }

    },
    firebase: JSON.parse(fs.readFileSync(process.env.FIRESTORE_PATH)),
    sesion: {
        tout: process.env.JWT_EXPIRED_TIME
    },
    adminUser: process.env.ADMIN_USER_ID
}
