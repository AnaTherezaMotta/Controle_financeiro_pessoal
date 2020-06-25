const lancamentos = [];
function salvarLancamentos(){

    const valor = document.getElementById("valor").value;
    const contaid = document.getElementById("conta").value;
    // console.log(contaid)
    const contaDados = localizarConta(contaid);
    console.log(contaDados)
    // console.log(localizarConta(contaid))
    const Lancamentos = {id:Date.now(),conta:contaDados,valor};

    let LancamentosGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
    
    if(LancamentosGravado == null){
        window.localStorage.setItem('lancamentos',JSON.stringify([]));
        LancamentosGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
        LancamentosGravado.push(Lancamentos);
        window.localStorage.setItem('lancamentos',JSON.stringify(LancamentosGravado));
        
    }else{
        LancamentosGravado.push(Lancamentos);
        window.localStorage.setItem('lancamentos',JSON.stringify(LancamentosGravado));
   }
    Swal.fire({
        icon: 'success',
        title: 'Conta cadastrada com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });



    limpar()
    listarLancamento();
    localizarReceitaDespesas()
}

function limpar(){
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

function localizarConta(id){
    // console.log(id)
    let contasGravado = JSON.parse(window.localStorage.getItem("contas"));
    // console.log(contasGravado)
    return contasGravado.filter(conta=>conta.nome.replace(" ","_").replace(" ","_") === id);
    
}
function localizarReceitaDespesas(){
    // console.log(id)
    let receitasDespesasGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
    let Receita = 0;
    let Despesa = 0;
    

    receitasDespesasGravado.forEach(Lancamento => {
        const conta = Lancamento.conta[0];
        if(conta.tipo == "Receitas"){
            Receita += parseFloat(Lancamento.valor)
        }else{
            Despesa += parseFloat(Lancamento.valor)
            
        }
    })
    
    let saldo = Receita - Despesa;

    if(saldo < 0){
        alert("Saldo NEGATIVO ): !!!!");
    }else{
        alert("Saldo Positivo (:");
    }

    document.getElementById('receita').innerText= `Receita: ${Receita.toFixed(2).replace('.',',')}`;
    document.getElementById('despesa').innerText=`Despesa: ${Despesa.toFixed(2).replace('.',',')}`;
    document.getElementById('saldo').innerText= `Saldo: ${(saldo).toFixed(2).replace('.',',')}`;

}

function listarContas(){
    let linha = "";
    let ContasGravado = JSON.parse(window.localStorage.getItem("contas"));
    
    if(ContasGravado){
        ContasGravado.forEach(Contas =>{
            row = document.getElementById("conta");
            
            if(row !== null){
                linha += "<option value ="+Contas.nome.replace(" ","_").replace(" ","_")+">"+Contas.nome+"</option>";
                row.innerHTML = linha;
            }
        });
    }

}
function listarLancamento(){
    let linha = "";
    let LancamentosGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
    if(LancamentosGravado){
        LancamentosGravado.forEach(Lancamentos => {
            row = document.getElementById("tbody");
            // console.log(Contas)
            if(row !== null){
                linha += "<tr>"+
                          "<td id='tdvalor'>"+Lancamentos.valor+"</td>"+
                          "<td id='tdconta'>"+Lancamentos.conta[0].nome+"</td>"+
                          "<td id='tddata'>"+Data()+"</td>"+

                          "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarLancamento("+Lancamentos.id+")'><i class='fa fa-edit'></i></button>"+
                          "<button class='btn btn-outline-danger'onclick='apagarlancamento("+Lancamentos.id+")'><i class='fa fa-trash'></i></button>"
                          +"</tr>";
            row.innerHTML=linha;         
            }
        });
    }
}

function editarLancamento(id){
    let LancamentosGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
    for(let i=0; i < LancamentosGravado.length; i++){
        document.getElementById("id").value = LancamentosGravado[i].id;
        document.getElementById("conta").value = LancamentosGravado[i].conta["id"];
        document.getElementById("valor").value = LancamentosGravado[i].valor;
        
        
    }

}

function alterarLancamentos(){
    const id = document.getElementById("id").value;
    const valor = document.getElementById("valor").value;
    const contaid = document.getElementById("conta").value;

    let LancamentosGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
    let LancamentosIndex= LancamentosGravado.findIndex(lancamentos => lancamentos.nome == id);

    if(LancamentosIndex >= 0){
        categoriaDados = localizarConta(contaid);
        LancamentosGravado[LancamentosIndex]={id,valor,conta:contaDados};
        window.localStorage.setItem("lancamentos",JSON.stringify(LancamentosGravado));
        

    }
    Swal.fire({
        icon: 'success',
        title: 'Conta alterada com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
    });
}


function apagarlancamento(id){
    Swal.fire({
        title: 'Confirma a exclusão do Lançamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let lancamentoGravado = JSON.parse(window.localStorage.getItem("lancamentos"));
            // console.log(lancamentoGravado)
            let lancamentoIndex = lancamentoGravado.filter(lancamento => lancamento.nome == id);
            console.log(lancamentoIndex)
            if(lancamentoIndex >= 0){
                lancamentoGravado.splice(lancamentoIndex,1);
                window.localStorage.setItem('lancamentos', JSON.stringify(lancamentoGravado));
                if(lancamentoGravado.length > 0){
                    listarLancamento();
                }else{
                    row = document.getElementById("tbody");
                    row.innerHTML = '';
                }
            }
          Swal.fire(
            'Lançamento Deletado!',
            '',
            'success'
          )
        }
      });
}

function Data(){
    const d = new Date();
    return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`;
}

listarContas();
localizarReceitaDespesas();
listarLancamento();