import ClienteDAO from "../DAO/ClienteDAO.js";
//DAO = Data Access Object -> Objecto de acesso aos dados
export default class Cliente{
    //atributos privados
    #cpf
    #nome
    #endereco
    #cidade
    #estado
    #cep

    constructor(cpf, nome, endereco, cidade, estado, cep){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
    }

    // métodos javascript getters e setters

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get estado(){
        return this.#estado;
    }

    set estado(novoEstado){
        this.#estado= novoEstado;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        this.#cep = novoCep;
    }

    //sobrescrita do método toString()
    toString(){
        //string literals
        return `CPF: ${this.#cpf}
Nome: ${this.#nome}
Endereço: ${this.#endereco}
Cidade: ${this.#cidade}
Estado: ${this.#estado}
CEP: ${this.#cep}
        `
    }

    async incluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async alterar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async consultar(termoBusca){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termoBusca);
    }
}