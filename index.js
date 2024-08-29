import Cliente from "./Modelo/Cliente.js"; //nunca se esqueça da extensão .js

const cliente = new Cliente("987.654.321-00", "Beltrano", "Rua Beltrano, 123", "Presidente Prudente", "SP", "12345-678");

/*cliente.incluir().then(() =>{
    console.log("Cliente incluído com sucesso!");
}).catch((erro) =>{
    console.log("Erro ao incluir o cliente: " +  erro);
});*/

cliente.consultar("987.654.321-00").then((listaClientes)=>{
    for (const cliente of listaClientes){
        console.log(cliente.toString());
    }
}).catch((erro) =>{
    console.log("Erro ao consultar os clientes: " + erro);
});


