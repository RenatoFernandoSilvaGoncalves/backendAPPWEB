import conectar from "./Conexao.js";
import Cliente from "../Modelo/Cliente.js";
export default class ClienteDAO{
    //Essa classe tem como responsabilidade gravar, alterar, excluir,
    // e consultar clientes no banco de dados

    constructor(){
        this.init(); //iniciailizar o banco de dados
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS cliente (
                     cpf VARCHAR(14) NOT NULL PRIMARY KEY, 
                     nome VARCHAR(80) NOT NULL, 
                     endereco VARCHAR(200) NOT NULL, 
                     cidade VARCHAR(100) NOT NULL, 
                     estado VARCHAR(2) NOT NULL, 
                     cep VARCHAR(10) NOT NULL);`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
        }
    }

    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(cpf,nome,endereco,cidade,estado,cep) 
                         VALUES (?, ?, ?, ?, ?, ?);`;
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.endereco,
                cliente.cidade,
                cliente.estado,
                cliente.cep
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET nome = ?, 
                         endereco = ?, 
                         cidade = ?, 
                         estado = ?, 
                         cep = ? 
                         WHERE cpf = ?;`;
            const parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.cidade,
                cliente.estado,
                cliente.cep,
                cliente.cpf
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?;`;
            const parametros = [
                cliente.cpf
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){ //se o termo de busca existir, busca será por cpf
            sql = `SELECT * FROM cliente WHERE cpf = ? order by nome;`;
            parametros.push(termoBusca);
        }
        else{
            sql = `SELECT * FROM cliente order by nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.cpf,
                registro.nome,
                registro.endereco,
                registro.cidade,
                registro.estado,
                registro.cep
            );
            listaClientes.push(cliente);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaClientes;

    }
}