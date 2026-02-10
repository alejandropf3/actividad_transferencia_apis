import { getPostById, getCommentByPost } from "./modules/enun2.js";

let resultado = await getPostById();
let recorreArreglo = await resultado.map(async (post) => {
    let comentarios = await getCommentByPost(post.id);
    let tiene = (comentarios.length > 0) ? "Con comentarios" : "Sin comentarios";
    return {
        "Titulo": post.title,
        "Cantidad Comentarios": comentarios.length,
        "Tiene Comentarios" : tiene
    }
});

let data = await Promise.all(recorreArreglo);
console.log(data);