import { cpus as _cpus } from 'os';
import config from '../config/config.js'

const args = process.argv.slice(2);


const getInfo = () => {
    const info = {
        args: JSON.stringify(args),
        path: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
        node: process.version,
        os: process.platform,
        cpus: _cpus().length,
        rss: process.memoryUsage().rss,
        dotenv_config: JSON.stringify(config)
    } 
    return info;
}


export {
    getInfo
}