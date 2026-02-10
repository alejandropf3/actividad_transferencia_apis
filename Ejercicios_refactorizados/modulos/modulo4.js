export const getPostById = async (id) => {
  const query = await fetch(`http://localhost:3000/posts?id=${id}`);
  const data = await query.json();
  return data
}

export const getCommetsByPost = async (postId) => {
  const comentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`);
  const data = await comentarios.json();
  return data
}

export const eliminarPublicacion = async (id) => {
  console.log(id);
  
  // const respuesta = await fetch(`http://localhost:3000/posts/${id}`, {
  //   method: 'DELETE',
  // });

  console.log("Publicación eliminada correctamente");
}