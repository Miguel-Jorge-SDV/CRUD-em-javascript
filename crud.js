const $meuForm = document.querySelector('form');
console.log($meuForm);
    
const blog = {
    usuarios: [
        {
            username: 'miguel',
        }
    ],
    
    posts: [
        {
            id: Date.now(),
            owner: 'miguel',
            content: 'Primeiro post',
        }
    ],
    
    criaPost(dados, htmlOnly = false) {
        //const id = blog.posts.length
        if(!htmlOnly) {
            blog.posts.push({
                id: dados.id,
                owner: dados.owner,
                content: dados.content
            });
        }

        const $postList = document.querySelector('.postList')
        $postList.insertAdjacentHTML('afterbegin', `
            <li data-id="${dados.id}">
                <button class="delete">Deletar</button> <span contenteditable>${dados.content}<span>
            </li>
            `)
    },

    readPosts() {
        blog.posts.forEach(({id, owner, content}) => {
            blog.criaPost({id, owner: owner, content: content}, true)
        })
    },

    updatePost(id, newContent) {
        const postAlvo = blog.posts.find((post) => {
            return post.id === Number(id);
        })
    
        console.log(postAlvo)
        postAlvo.content = newContent
    },
    
    deletaPost(id) {
        const postsAtualizados = blog.posts.filter((postAtual) => {
            return postAtual.id !== Number(id);
        })
        
        console.log(postsAtualizados)
        blog.posts = postsAtualizados
    }
}

//CREATE
$meuForm.addEventListener('submit', function criaPostController(infosDoEvento) {
    infosDoEvento.preventDefault();
    const $criaPost = document.querySelector('input[name="criaPost"]');
    if($criaPost.value == "") {
        alert('Digite algo')
        return
    }
    blog.criaPost({owner: 'miguel', content: $criaPost.value});
    $criaPost.value = "";
})

//READ
blog.readPosts();

//UPDATE
document.querySelector('.postList').addEventListener('input', function(infosDoEvento) {
    console.log('Houve uma alteração')
    const elementoAtual = infosDoEvento.target
    const id = elementoAtual.parentNode.getAttribute('data-id')
    blog.updatePost(id, elementoAtual.innerText)
})

//DELETE
document.querySelector('.postList').addEventListener('click', function(infosDoEvento) {
    const elementoAtual = infosDoEvento.target
    const isBtnDeleteClick = infosDoEvento.target.classList.contains('delete')
    if(isBtnDeleteClick) {
        console.log(`Clicou no botão de apagar`)
        const id = elementoAtual.parentNode.getAttribute('data-id')
        blog.deletaPost(id)
        elementoAtual.parentNode.remove()
    }
})