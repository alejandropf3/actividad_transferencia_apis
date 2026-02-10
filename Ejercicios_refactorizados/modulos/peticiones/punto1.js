import { usuarios, postUsuarios } from './modules/enun1.js';

usuarios()
.then((usuario) => 
{
    const resultados = [];
    usuario.map(({id, name}) => 
    {
        postUsuarios(id)
        .then((post) => {
            resultados.push({
                nombre : name,
                CantidadPosts: post.length 
            });
            if(resultados.length === usuario.length)
            {
                console.log(resultados);
            }
        })
    })
})