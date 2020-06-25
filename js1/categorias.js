 const categorias=[];
function salvarCategorias(){
    const nome = document.getElementById("nome").value;

    const Categorias = {id:Date.now(),nome};
    
    let CategoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
    // console.log(CategoriasGravado)
    if(CategoriasGravado == null){
        window.localStorage.setItem('categorias',JSON.stringify([]));
        CategoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
        CategoriasGravado.push(Categorias);
        // console.log(CategoriasGravado)
        window.localStorage.setItem('categorias',JSON.stringify(CategoriasGravado));
    
    }else{
        CategoriasGravado.push(Categorias);
        window.localStorage.setItem('categorias',JSON.stringify(CategoriasGravado));
    }
    
    Swal.fire({
        icon: 'success',
        title: 'Categoria cadastrada com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
    
    limpar()
     listarCategoria();
    
}

function limpar(){
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
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
                    
                    "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarCategoria("+categoria.id+")'><i class='fa fa-edit'></i></button>"+
                    "<button class='btn btn-outline-danger'onclick='apagarcategoria("+categoria.id+")'><i class='fa fa-trash'></i></button>"
                    +"</tr>";
                row.innerHTML = linha;
            }
            
        });
    }
}
function editarCategoria(id){
    let categoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
    for(let i = 0;i < categoriasGravado.length; i++){
        document.getElementById("id").value = categoriasGravado[i].id;
        document.getElementById("nome").value = categoriasGravado[i].nome;
        
    }
    
}
function alterarCategoria(){
        const id = document.getElementById("id").value;
        const nome = document.getElementById("nome").value;
        
    
        let categoriaGravado = JSON.parse(window.localStorage.getItem("categorias"));
        let categoriaIndex = categoriaGravado.findIndex(categoria => categoria.id == id);
    
        categoriaGravado[id] = {id,nome};
        Swal.fire({
            icon: 'success',
            title: 'Categoria atualizada com sucesso!!!',
            showConfirmButton: false,
            timer: 1500
        });
        limpar();
        listarCategoria();
}

function apagarcategoria(id){
    Swal.fire({
        title: 'Confirma a exclusão da Categoria?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let categoriaGravado = JSON.parse(window.localStorage.getItem("categorias"));
            let categoriaIndex = categoriaGravado.findIndex(categoria => categoria.id = id);
            if(categoriaIndex >= 0){
                categoriaGravado.splice(categoriaIndex,1);
                window.localStorage.setItem('categorias', JSON.stringify(categoriaGravado));
                if(categoriaGravado.length > 0){
                    listarCategoria();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Categoria Deletada!',
            '',
            'success'
          )
        }
      });
}



listarCategoria();