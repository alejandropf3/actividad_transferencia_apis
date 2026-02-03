// URL base del servidor local user
const API_URL = 'http://localhost:3000';

// Función principal para gestionar la eliminación lógica
async function gestionarEliminacionPublicacion(postId) {
    try {
        console.log(`Iniciando proceso para la publicación ID: ${postId}`);

        // 1. Verificar si la publicación tiene comentarios asociados
        // Consultamos los comentarios filtrando por el ID de la publicación
        const respuestaComentarios = await fetch(`${API_URL}/comments?postId=${postId}`);
        const comentarios = await respuestaComentarios.json();

        // Si existen comentarios, no se puede eliminar
        if (comentarios.length > 0) {
            console.log("Resultado: No se puede eliminar la publicación porque tiene comentarios.");
            return;
        }

        // 2. Si no tiene comentarios, proceder a eliminar la publicación
        console.log("No se encontraron comentarios. Procediendo a eliminar...");

        await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
        });

        // 3. Validar el resultado mediante una nueva consulta
        // Intentamos obtener la publicación eliminada para verificar que ya no existe
        const respuestaValidacion = await fetch(`${API_URL}/posts/${postId}`);

        // En json-server y muchas APIs REST, un GET a un recurso eliminado devuelve 404
        if (respuestaValidacion.status === 404) {
            console.log("Resultado: Publicación eliminada correctamente.");
        } else {
            console.warn("Advertencia: La publicación parece seguir existiendo tras el intento de eliminación.");
        }

    } catch (error) {
        console.error("Error en el proceso:", error);
    }
}

// Ejemplo de uso:
// Cambia este ID para probar con diferentes publicaciones
// Por ejemplo, usa un ID que sepas que tiene comentarios y uno que no (si controlas los datos del servidor)
gestionarEliminacionPublicacion(9);
