const usuarios = [];
// const produtos = [];
// const categorias = [];
function cadUsuario(){
    const nome = document.getElementById("nome").value;
    const cep = document.getElementById("cep").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const status = 'ativo';
    // const status = document.getElementById("status").value;
    const senha = document.getElementById("senha").value;

    // let id = usuarios.length
    const usuario = {id: Date.now(),nome, cep, telefone, email, status,senha};
    // usuarios.push(usuario);
    // // console.log(usuarios)
    // window.localStorage.setItem("usuarios",JSON.stringify(usuarios));
    let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
    if(usuarioGravado == null){
        window.localStorage.setItem('usuarios',JSON.stringify([]));
        usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
        usuarioGravado.push(usuario);
        window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado));

        let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email == email);
        if(usuarioIndex !== -1){
            Swal.fire({
                icon: 'warning',
                title: 'Email já está cadastrado no sistema!',
                showConfirmButton: false,
                timer: 1500
            });
        }else{
            usuarioGravado.push(usuario);
        window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado));
        }
        

    }else{ // chave usuario ja existente na memoria
        usuarioGravado.push(usuario);
        window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado));
        let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.email == email);
        if(usuarioIndex !== -1){
            Swal.fire({
                icon: 'warning',
                title: 'Email já está cadastrado no sistema!',
                showConfirmButton: false,
                timer: 1500
            });

        
        }else{
            usuarioGravado.push(usuario);
            window.localStorage.setItem('usuarios', JSON.stringify(usuarioGravado));
        }
        
        
    }
    
    Swal.fire({
        icon: 'success',
        title: 'Usuário cadastrado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
      
    limpar();
    listarUser();
    // listarUsuarios();

}

function logar(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    // recuperar o valor do localstorage
    // let usuariosGravados = window.localStorage.getItem("usuarios");
    // console.log(usuariosGravados);
    let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email == email);
    if(usuarioIndex == -1){// email não existe
        Swal.fire({
            icon: 'warning',
            title: 'Email não cadastrado no sistema!',
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        if(usuariosGravados[usuarioIndex].senha !== senha){
            Swal.fire({
                icon: 'warning',
                title: 'Senha não cadastrada no sistema!',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("senha").value = '';
        }else{
            // email e senha corretos
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                 // href="DesafioObjetos/paper-dashboard-master/examples/dashboard"
                   
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: `Bem vindo, ${usuariosGravados[usuarioIndex].nome}!`,
                
              });
              var delay = 2000; 
              setTimeout(function(){
                window.location.href = "usuario.html";
                      
              },delay);
              
                
            }
    }

}


function apagarHistorico(){
    window.localStorage.removeItem("produtos");
}

function listarUser(){
    let linha = "";
    let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
    if(usuariosGravado){
        usuariosGravado.forEach(usuario => {
            row = document.getElementById("tbody");
            if(row != null){
                linha += "<tr>"+
                    "<td id='tdid'>"+usuario.id+"</td>"+
                    "<td id='tdnome'>"+usuario.nome+"</td>"+
                    "<td id='tdemail'>"+usuario.email+"</td>"+
                    "<td id='tdsenha'>"+usuario.senha+"</td>"+
                    "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
                    "<td id='tdcep'>"+usuario.cep+"</td>"+
                    "<td id='tdstatus'>"+usuario.status+"</td>"+
                    "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editaruser("+usuario.id+")'><i class='fa fa-edit'>editar</i></button>"+
                    "<button class='btn btn-outline-danger'onclick='apagaruser("+usuario.id+")'>apagar<i class='fa fa-trash'></i></button>"
                    +"</tr>";
                row.innerHTML = linha;
            }
            
        });
    }
}




function apagarproduto(id){
    Swal.fire({
        title: 'Confirma a exclusão do Produto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let produtosGravado = JSON.parse(window.localStorage.getItem("produtos"));
            let produtoIndex = produtosGravado.findIndex(produto => produto.id = id);
            if(produtoIndex >= 0){
                produtosGravado.splice(produtoIndex,1);
                window.localStorage.setItem('produtos', JSON.stringify(produtosGravado));
                if(produtosGravado.length > 0){
                    listarProdutos();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Produto Deletado!',
            '',
            'success'
          )
        }
      });
}

function apagaruser(id){
    Swal.fire({
        title: 'Confirma a exclusão do usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
            let usuarioIndex = usuariosGravado.findIndex(usuario => usuario.id = id);
            if(usuarioIndex >= 0){
                usuariosGravado.splice(usuarioIndex,1);
                window.localStorage.setItem('usuarios', JSON.stringify(usuariosGravado));
                if(usuariosGravado.length > 0){
                    listarUser();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Usuario Deletado!',
            '',
            'success'
          )
        }
      });
}


function editaruser(id){
    let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
    for(let i = 0;i < usuariosGravado.length; i++){
        document.getElementById("id").value = usuariosGravado[i].id;
        document.getElementById("nome").value = usuariosGravado[i].nome;
        document.getElementById("email").value = usuariosGravado[i].email;
        document.getElementById("senha").value = usuariosGravado[i].senha;
        document.getElementById("telefone").value = usuariosGravado[i].telefone;
        document.getElementById("cep").value = usuariosGravado[i].cep;
        document.getElementById("status").value = usuariosGravado[i].status;

    }
}

function alterarUser(){
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;
    const cep = document.getElementById("cep").value;
    const status = document.getElementById("status").value;

    let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
    let usuarioIndex = usuarioGravado.findIndex(usuario => usuario.nome == id);

    usuarioGravado[id] = {id,nome,email,senha,telefone,cep,status};
    Swal.fire({
        icon: 'success',
        title: 'Produto atualizado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
    limpar();
    listarUser();
}



function editarproduto(id){
    let produtosGravado = JSON.parse(window.localStorage.getItem("produtos"));
    for(let i = 0;i < produtosGravado.length; i++){
        document.getElementById("id").value = produtosGravado[i].id;
        document.getElementById("nome").value = produtosGravado[i].nome;
        document.getElementById("descricao").value = produtosGravado[i].descricao;
        document.getElementById("quantidade").value = produtosGravado[i].quantidade;
        document.getElementById("preco").value = produtosGravado[i].preco;

    }
}

function alterarProduto(){
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value;

    let produtoGravado = JSON.parse(window.localStorage.getItem("produtos"));
    let produtoIndex = produtoGravado.findIndex(produto => produto.id == id);

    produtoGravado[id] = {id,nome,descricao,quantidade,preco};
    Swal.fire({
        icon: 'success',
        title: 'Produto atualizado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
    limpar();
    listarProdutos();
}

function limpar(){
    // limpar de forma basica manual
    // document.getElementById("nome").value = "";
    // document.getElementById("endereco").value = "";
    // document.getElementById("telefone").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("cidade").value = "";

    // limpar de forma automatica
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

function listarProdutosVendas(){
    let linha = "";
    let produtosGravado = JSON.parse(window.localStorage.getItem("produtos"));
    if(produtosGravado){
    
        produtosGravado.forEach(produto =>{
            row = document.getElementById("produtosVenda");
            if(row != null){
                linha += "<div class='card item'>"+
                        "<div class='card-header' align='center'>"+
                             "<h1>"+produto.nome+"</h1>"+
                        "</div>"+
                        "<div class='card-body'>"+
                            "<p>"+produto.descricao+"</p>"+
                            "<h2>R$: "+parseFloat(produto.preco).toFixed(2)+"</h2>"+
                            "<button class='btn btn-outline-danger'onclick='adicionarCarrinho("+produto.id+")'>Comprar</button>"
                        "</div>"+
                        "</div>";
            
            row.innerHTML = linha;
            
            }
        });
    }
    
}

function adicionarCarrinho(id){
    let cart = JSON.parse(window.localStorage.getItem("cartComprados"));
    if(cart == null){
        window.localStorage.setItem("cartComprados",JSON.stringify([]));
        cart = JSON.parse(window.localStorage.getItem("cartComprados"));

        cart.push(id);
        window.localStorage.setItem("cartComprados",JSON.stringify(cart));
        Swal.fire({
            icon: 'success',
            title: 'Produto adicionado no carrinho com sucesso!!!',
            showConfirmButton: false,
            timer: 1500
        });
    }

}



function apagarUsuario(id){
    Swal.fire({
        title: 'Confirma a exclusão do usuário?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let usuarioIndex = usuarios.findIndex(usuario => usuario.id = id);
            if(usuarioIndex >= 0){
                usuarios.splice(usuarioIndex,1);
                if(usuarios.length > 0){
                    listarUsuarios();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Usuário Deletado!',
            '',
            'success'
          )
        }
      });
      
}


function editarUsuario(id){
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].id = id){
        document.getElementById("id").value = usuarios[i].id;
        document.getElementById("nome").value = usuarios[i].nome;
        document.getElementById("endereco").value = usuarios[i].endereco;
        document.getElementById("telefone").value = usuarios[i].telefone;
        document.getElementById("email").value = usuarios[i].email;
        document.getElementById("cidade").value = usuarios[i].cidade;
        }
        
        
    }
    

}

function alterarUsuario(){
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const cidade = document.getElementById("cidade").value;
    const senha = document.getElementById("senha").value;


    let usuarioIndex = usuarios.findIndex(usuario=> usuario.id = id);
    usuarios[usuarioIndex]= {id, nome, endereco, telefone, email, cidade}, senha;
    

    usuarioIndex.push(usuario);
    window.localStorage.setItem('usuarios', JSON.stringify(usuarioIndex));
    // como fz pra atualizar a posisao do array
    // usuarios[id] = {id,nome,endereco,telefone,email,cidade};
    Swal.fire({
        icon: 'success',
        title: 'Usuário alterado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
      
    limpar();


}
function cadCategoria(){
    const nome = document.getElementById("nome").value;

    const categoria = {id: Date.now(),nome};
  
    let categoriaGravado = JSON.parse(window.localStorage.getItem("categorias"));
    if(categoriaGravado == null){
        window.localStorage.setItem('categorias',JSON.stringify([]));
        categoriaGravado = JSON.parse(window.localStorage.getItem("categorias"));
        categoriaGravado.push(categoria);
        window.localStorage.setItem('categorias', JSON.stringify(categoriaGravado));

        let categoriaIndex = categoriaGravado.findIndex(categorias => categoria.nome == nome);
         if(categoriaIndex !== -1){
            Swal.fire({
                icon: 'warning',
                title: 'Nome já está cadastrado no sistema!',
                showConfirmButton: false,
                timer: 1500
            });
        }else{
            categoriaGravado.push(categoria);
        window.localStorage.setItem('categorias', JSON.stringify(categoriaGravado));
        }
        

     }else{ // chave usuario ja existente na memoria
         categoriaGravado.push(categoria);
      window.localStorage.setItem('categoria', JSON.stringify(categoriaGravado));
    //     let categoriaIndex = categoriaGravado.findIndex(categoria => categoria);
        // if(categoriaIndex !== -1){
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Email já está cadastrado no sistema!',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });

        
        // }else{
        //     categoriaGravado.push(categoria);
        //     window.localStorage.setItem('categorias', JSON.stringify(categoriaGravado));
        // }
        
        
    }
    
    Swal.fire({
        icon: 'success',
        title: 'Catregoria cadastrado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
      
    limpar();
    listarCategoria();
    

}
function listarCategoria(){
    let linha = "";
    let categoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
    if(categoriasGravado){
        categoriasGravado.forEach(categoria => {
            row = document.getElementById("tbody");
            if(row != null){
                linha += "<tr>"+
                    "<td id='tdid'>"+categoria.id+"</td>"+
                    "<td id='tdnome'>"+categoria.nome+"</td>"+
                    
                    "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarcategoria("+categoria.id+")'><i class='fa fa-edit'>editar</i></button>"+
                    "<button class='btn btn-outline-danger'onclick='apagarcategoria("+categoria.id+")'>apagar<i class='fa fa-trash'></i></button>"
                    +"</tr>";
                row.innerHTML = linha;
            }
            
        });
    }
}

listarUser();