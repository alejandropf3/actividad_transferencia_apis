// URL base del servidor
const API_URL = 'http://localhost:3000';

// Función principal asíncrona para ejecutar la lógica
async function main() {
    try {
        // Consultar la lista completa de usuarios
        const usersResponse = await fetch(`${API_URL}/users`);
        const users = await usersResponse.json();

        // Consultar la lista de publicaciones
        const postsResponse = await fetch(`${API_URL}/posts`);
        const posts = await postsResponse.json();

        // Objeto para contar las publicaciones por usuario
        const postsCount = {};

        // Recorremos las publicaciones para contarlas por userId
        posts.forEach(post => {
            if (postsCount[post.userId]) {
                postsCount[post.userId]++;
            } else {
                postsCount[post.userId] = 1;
            }
        });

        // Mostramos el listado de usuarios con la cantidad de publicaciones
        console.log("Listado de usuarios y sus publicaciones:");
        users.forEach(user => {
            // Obtenemos la cantidad de publicaciones, o 0 si no tiene
            const count = postsCount[user.id] || 0;
            
            // Imprimimos el resultado
            console.log(`Nombre: ${user.name} - Publicaciones: ${count}`);
        });

    } catch (error) {
        // Manejo de errores en caso de que falle alguna petición
        console.error("Error al obtener los datos:", error);
    }
}

// Ejecutar la aplicación
main();
