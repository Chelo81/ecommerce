import log4js from 'log4js'
const { configure, getLogger } = log4js
configure({
    appenders: {
      consola: { type: "console" },
      errores: { type: 'file', filename: 'error.log' },
      loggerConsole: { type: 'logLevelFilter', appender: 'consola', level: 'debug' },
      loggerError: { type: 'logLevelFilter', appender: 'errores', level: 'error' }
    },
    categories: {
      default: { appenders: ["consola"], level: "trace" },
      all: { appenders: ['loggerConsole', 'loggerError'], level: "all" }
    }
})

export default () => {
    // const category = env_variable === 'PROD' ? 'prod' : 'dev'
    return getLogger('all')
}