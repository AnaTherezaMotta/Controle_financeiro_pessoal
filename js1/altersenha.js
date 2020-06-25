function Alterarsenha(){
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const cep = document.getElementById("cep").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("nsenha").value;
    
  
    
    usuarios[id] = {id,nome, cep, telefone, email , senha};
    
   
   
  
    
    
  
    Swal.fire({
      
      icon: 'success',
      title: 'Senha Atualizada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
}