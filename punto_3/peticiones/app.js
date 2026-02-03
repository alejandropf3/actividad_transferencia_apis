// URL base del servidor local
const BASE_URL = 'http://localhost:3000';

// Función principal asíncrona para ejecutar la lógica
async function consultarInformacion() {
    try {
        // 1. Consultar todas las publicaciones
        console.log('Consultando todas las publicaciones...');
        const respuestaPosts = await fetch(`${BASE_URL}/posts`);

        // Validar respuesta del servidor
        if (!respuestaPosts.ok) throw new Error(`Error en /posts: ${respuestaPosts.statusText}`);

        const posts = await respuestaPosts.json();
        console.log(`Total de publicaciones encontradas: ${posts.length}\n`);

        if (posts.length === 0) {
            console.log('No hay publicaciones para analizar.');
            return;
        }

        // Iteramos sobre CADA publicación encontrada para mostrar su información
        for (const post of posts) {
            const ID_PUBLICACION = post.id;

            // 2. Consultar los comentarios relacionados con ESTA publicación
            // Intentamos el endpoint anidado primero
            let comentarios = [];
            let respuestaComentarios = await fetch(`${BASE_URL}/posts/${ID_PUBLICACION}/comments`);

            if (respuestaComentarios.ok) {
                // Verificamos si es JSON válido
                const contentType = respuestaComentarios.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    comentarios = await respuestaComentarios.json();
                }
            } else {
                // Si falla la ruta anidada (ej. 404), usamos el fallback con query param
                const queryResponse = await fetch(`${BASE_URL}/comments?postId=${ID_PUBLICACION}`);
                if (queryResponse.ok) {
                    comentarios = await queryResponse.json();
                }
            }

            // 3. Validar y procesar datos
            const numeroComentarios = comentarios.length;
            const tieneComentarios = numeroComentarios > 0;

            // 4. Mostrar información en consola separada por bloques
            console.log(`\n--- Publicación ID: ${ID_PUBLICACION} ---`);
            console.log(`Título: ${post.title}`);
            console.log(`Contenido: ${post.body}`);
            console.log(`Número de comentarios: ${numeroComentarios}`);

            if (tieneComentarios) {
                console.log('Estado: Tiene interacción.');
            } else {
                console.log('Estado: Sin comentarios.');
            }
        }

    } catch (error) {
        console.error('Ocurrió un error:', error.message);
    }
}

// Ejecutar la función
consultarInformacion();
