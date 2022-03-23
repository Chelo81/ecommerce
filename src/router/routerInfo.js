import express from 'express';
import { info, log } from '../controllers/info.js';
import compression from 'compression';
const { Router } = express

const routerInfo = new Router();

routerInfo.get('/', info)

routerInfo.get('/Log', log)

routerInfo.get('/zip', compression(), info)

export default routerInfo;