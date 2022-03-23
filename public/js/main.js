const socket = io();

function enviarMensaje() {
    const id = document.getElementById('email').value
    //suponemos un check para filtrar solo nuestros mjes
    const inputMje = document.getElementById('mje');
    
    const userOnlyFlag = document.getElementById('onlyOwner').checked
    if (userOnlyFlag == true) {
        socket.emit("mensajeSoloUser",{ userid: id, mensaje: inputMje.value})
    } else {
        socket.emit("mensaje", { userid: id, mensaje: inputMje.value})
    }

}

socket.on("mensajes", actualizarMensajes);



/*
Esta parte queda a modo de bosquejo basado
en lo que se hizo durante el curso,
 ya que es un poco a como se diseñe el front
*/
async function actualizarMensajes(data) {

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('plantillas/mensajes.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({data})
    // const html = functionTemplate({mensajes})

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('chat').innerHTML = html

}

