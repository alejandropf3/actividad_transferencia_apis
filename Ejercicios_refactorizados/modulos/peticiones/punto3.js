import { getPostById, getCommentByPost } from "./modules/enun3.js";

let resultado = await getPostById(2);
let recorreArreglo = await resultado.map(async (post) => {
    let comment = await getCommentByPost(post.id);
    return {
        "Titulo": post.title,
        "Contenido": post.body,
        "Comentarios" : comment.length
    }
})

let data = await Promise.all(recorreArreglo);
console.log(data);