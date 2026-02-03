
// Definimos la URL base del servidor local
const API_URL = 'http://localhost:3000';

// Función para obtener y analizar datos (GET)
async function analizarPublicaciones() {
    console.log("\n--- Iniciando Análisis ---");
    try {
        // 1. Consultar todas las publicaciones
        const respuestaPosts = await fetch(`${API_URL}/posts`);
        const publicaciones = await respuestaPosts.json();

        // 2. Consultar todos los comentarios
        const respuestaComments = await fetch(`${API_URL}/comments`);
        const comentarios = await respuestaComments.json();

        // 3. Relacionar y clasificar
        const reporte = publicaciones.map(publicacion => {
            // Filtramos comentarios por ID de publicación
            const comentariosDeLaPublicacion = comentarios.filter(comentario => comentario.postId === publicacion.id);
            const numeroDeComentarios = comentariosDeLaPublicacion.length;
            const estado = numeroDeComentarios > 0 ? "Con comentarios" : "Sin comentarios";

            return {
                titulo: publicacion.title,
                numero_de_comentarios: numeroDeComentarios,
                estado: estado
            };
        });

        // 4. Mostrar resultados
        console.log("Reporte de Publicaciones:");
        console.log(reporte);

        const sinComentarios = reporte.filter(p => p.estado === "Sin comentarios");
        console.log(`Total de publicaciones sin comentarios: ${sinComentarios.length}`);

    } catch (error) {
        console.error("Error en análisis:", error);
    }
}

// Función para crear una nueva publicación (POST)
async function crearPublicacion(titulo, autorId) {
    console.log(`\nCreando publicación: "${titulo}"...`);
    try {
        const respuesta = await fetch(`${API_URL}/posts`, {
            method: 'POST', // Método HTTP para enviar datos
            body: JSON.stringify({ // Convertimos el objeto a texto JSON
                title: titulo,
                userId: autorId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Indicamos que enviamos JSON
            },
        });
        const data = await respuesta.json(); // Obtenemos la respuesta del servidor (con el nuevo ID)
        console.log("Publicación creada:", data);
        return data; // Retornamos la publicación creada
    } catch (error) {
        console.error("Error al crear publicación:", error);
    }
}

// Función para crear un nuevo comentario (POST)
async function crearComentario(postId, nombre, cuerpo, email) {
    console.log(`\nCreando comentario para post ${postId}...`);
    try {
        const respuesta = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                name: nombre,
                body: cuerpo,
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await respuesta.json();
        console.log("Comentario creado:", data);
        return data;
    } catch (error) {
        console.error("Error al crear comentario:", error);
    }
}

// Función principal para ejecutar todo el flujo
async function ejecutarApp() {
    // 1. Ejecutar análisis inicial
    await analizarPublicaciones();

    // 2. Crear una nueva publicación de prueba
    // Guardamos la nueva publicación para usar su ID
    const nuevaPublicacion = await crearPublicacion("Nueva Publicación desde Node", 1);

    // Validamos si se creó correctamente para agregarle un comentario
    if (nuevaPublicacion && nuevaPublicacion.id) {
        // 3. Crear un comentario en esa nueva publicación
        await crearComentario(
            nuevaPublicacion.id,
            "Comentario de prueba",
            "Esto es un excelente post.",
            "test@correo.com"
        );
    }

    // 4. Ejecutar análisis nuevamente para ver los cambios
    // Nota: Si el servidor no persiste datos (como JSONPlaceholder real), esto no mostrará cambios.
    // Si es un json-server local, sí se verán.
    await analizarPublicaciones();
}

// Iniciamos la aplicación
ejecutarApp();
