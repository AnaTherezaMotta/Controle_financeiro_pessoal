const contas = [];
function salvarContas(){
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const categoriaid = document.getElementById("categoria").value;
    // console.log(categoriaid)
    const categoriaDados = localizarCategoria(categoriaid);

    const Contas = {id:Date.now(),nome,tipo,categoria:categoriaDados};

    let ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
    if(ContasGravado == null){
        window.localStorage.setItem('contas',JSON.stringify([]));
        ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
        ContasGravado.push(Contas);
        window.localStorage.setItem('contas',JSON.stringify(ContasGravado));
        
    }else{
        ContasGravado.push(Contas);
        window.localStorage.setItem('contas',JSON.stringify(ContasGravado));
   }
    Swal.fire({
        icon: 'success',
        title: 'Conta cadastrada com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });

    limpar()
    listarContas();
}

function limpar(){
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}


function localizarCategoria(id){
    // console.log(id)
    let categoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
    // console.log(categoriasGravado)
    return categoriasGravado.filter(categoria=>categoria.nome === id);
    

}

function listarContas(){
    let linha = "";
    let ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
    if(ContasGravado){
        ContasGravado.forEach(Contas => {
            row = document.getElementById("tbody");
            // console.log(Contas)
            if(row !== null){
                linha += "<tr>"+
                          "<td id='tdid' hidden>"+Contas.id+"</td>"+
                          "<td id='tdnome'>"+Contas.nome +"</td>"+
                          "<td id='tddescricao'>"+Contas.tipo+"</td>"+
                          "<td id='tdcategoria'>"+Contas.categoria[0].nome+"</td>"+

                          "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarContas("+contas.id+")'><i class='fa fa-edit'></i></button>"+
                          "<button class='btn btn-outline-danger'onclick='apagarcontas("+contas.id+")'><i class='fa fa-trash'></i></button>"
                          +"</tr>";
            row.innerHTML=linha;         
            }
        });
    }
}

function listarCategorias(){
    let linha = "";
    let CategoriasGravado = JSON.parse(window.localStorage.getItem("categorias"));
    if(CategoriasGravado){
        CategoriasGravado.forEach(Categorias =>{
            row = document.getElementById("categoria");
            if(row !== null){
                linha += "<option value ="+Categorias.nome+">"+Categorias.nome+"</option>";
                row.innerHTML = linha;
            }
        });
    }

}

function editarContas(id){
    let ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
    for(let i=0; i < ContasGravado.length; i++){
        document.getElementById("id").value = ContasGravado[i].id;
        document.getElementById("nome").value = ContasGravado[i].nome;
        document.getElementById("tipo").value = ContasGravado[i].tipo;
        document.getElementById("categoria").value = ContasGravado[i].categoria["id"];
        
    }

}

function alterarContas(){
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const categoriaid = document.getElementById("categoria").value;

    let ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
    let ContasIndex= ContasGravado.findIndex(Contas => Contas.nome == id);

    if(ContasIndex >= 0){
        categoriaDados = localizarCategoria(categoriaid);
        ContasGravado[ContasIndex]={id,nome,tipo,categoria:categoriaDados};
        window.localStorage.setItem("contas",JSON.stringify(ContasGravado));
        

    }
    Swal.fire({
        icon: 'success',
        title: 'Conta alterada com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
}

function apagarcontas(id){
    Swal.fire({
        title: 'Confirma a exclusão da Conta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let contaGravado = JSON.parse(window.localStorage.getItem("contas"));
            // console.log(contaGravado)
            let contaIndex = contaGravado.filter(conta => conta.id == id);
            console.log(contaIndex)
            if(contaIndex >= 0){
                contaGravado.splice(contaIndex,1);
                window.localStorage.setItem('contas', JSON.stringify(contaGravado));
                if(contaGravado.length > 0){
                    listarContas();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Conta Deletada!',
            '',
            'success'
          )
        }
      });
}

listarCategorias();
listarContas();