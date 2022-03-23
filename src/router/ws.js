import mensajes from '../Negocio/Mensajes.js'

async function getMensajes() {
    try {
        const mjes = await mensajes.obtenerMensajes();
        return mjes
    } catch (error) {
        logError(error.message)
        return []
    }
}

function filtrarMjes(id, mjes) {
    
    let mjesFiltrados = []
    mjes.forEach(mje => {
        if (mje.userid == id) {
            mjesFiltrados.push(mje)
        }
    });
    return mjesFiltrados
}

export default async function chatHandler(socket, sockets) {

    socket.emit('mensajes', await getMensajes());

    socket.on('mensajeSoloUser', async data => {
        try {
            await mensajes.guardarMensaje(data)
        } catch (error) {
            logError(`error al guardar mensaje: ${error.message}`)
        }

        const mjes = await getMensajes();

        sockets.emit('mensajes', filtrarMjes(data.userid, mjes));
    })

    socket.on('mensaje', async data => {
        try {

            await mensajes.guardarMensaje(data)
        } catch (error) {
            logError(`error al guardar mensaje: ${error.message}`)
        }

        sockets.emit('mensajes', await getMensajes());
    })
}