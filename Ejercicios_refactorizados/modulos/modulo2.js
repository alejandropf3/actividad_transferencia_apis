export const getPostById = async () => {
    const consulta = await fetch(`http://localhost:3000/posts`);
    const resultadoPost = await consulta.json();
    return resultadoPost
}

export const getCommentByPost = async (postId) => {
    const consultaComentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`);
    const resultadoComment = await consultaComentarios.json();
    return resultadoComment
}