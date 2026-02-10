
export const usuarios = async () => {
    const respuestaUser = await fetch('http://localhost:3000/users');
    return await respuestaUser.json();
}
export const postUsuarios = async (id) => {
    const respuestaPost = await fetch(`http://localhost:3000/posts?userId=${id}`);
    return await respuestaPost.json();
}