import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const PRIVATE_KEY = "jamas lo descubriras"
const expireTime = config.sesion.tout;

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: expireTime });
    return token;
}

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({
        error: 'not authenticated'
      });
    }
   
    const token = authHeader.split(' ')[1];
   
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: 'not authorized'
        });
      }
   
      req.user = decoded.data;
      next();
    });
};
   
export default {
    generateToken,
    auth
}