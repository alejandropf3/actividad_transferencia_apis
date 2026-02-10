export const getPostById = async (id) => {
    const consulta = await fetch(`http://localhost:3000/posts?id=${id}`);
    const resultadoPost = await consulta.json();
    return resultadoPost
}

export const getCommentByPost = async (postId) => {
    const consultaComentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`);
    const resultadoComment = await consultaComentarios.json();
    return resultadoComment
}