import { getPostById, getCommetsByPost, eliminarPublicacion } from "../modulo4.js";
// let resultado = await getPostById(2)
// let respuesta = await resultado.map(async (post) => {
//   let comment = await getCommetsByPost(post.id);
//   return {
//     "Titulo": post.title,
//     "Contenido": post.body,
//     "Comentarios": comment.length
//   }
// })

// let data = await Prom  ise.all(respuesta);
// console.log(data);

let datospost = await getPostById(1)
console.log(datospost);

let tiene = ((await getCommetsByPost(datospost.id)).length > 0) ? true : false;

let vista = (await getCommetsByPost(datospost.id))
console.log(vista);

console.log(tiene);

if (tiene)
{
  console.log("Comentario eliminada correctamente");
}
else
{
  console.log("Si se puede eliminar");
  let eliminacion = await eliminarPublicacion(datospost.postId);
  console.log(eliminacion);
  
}
// console.log(tiene);


// let validacion = await validacionPublicacion( async (post) => {
//   let comment = await getCommetsByPost(post.id);

// });