import httpServer from './app.js'
// -------- Logger config ---------------
import loggerModule from './utils/log4js.js'
const logger = loggerModule()

// ------------ Cluster config check ------------------
import cluster from 'cluster';
import os from 'os';
// const cpus = os.cpus().length
const cpus = 4;

if (process.env.MODE === 'cluster' && cluster.isMaster) {
  logger.info("Iniciando Server en modo Cluster")
  logger.info(`${cpus} procesadores detectados`)
  logger.info(`Master PID: ${process.pid}`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} terminado`)
    cluster.fork() // keepAlive de los workers
  })
} else {
  if(process.env.MODE === 'fork'){
    logger.info("Iniciando Server en modo fork")
  } else {
    logger.info(`Worker PID ${process.pid}`)
  }


   const PORT = process.env.PORT || 8080
   const server = httpServer.listen(PORT, () => {
      logger.info(`Servidor Http escuchando en el puerto ${server.address().port}`)
   })
   server.on("error", error => logger.error(`Error en servidor ${error}`))
}