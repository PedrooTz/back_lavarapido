// CRUD LAVA RÁPIDO
// Autor : Pedro Pedraga
// Data : 21/05/24

const message = require('../modulo/config.js')

const clientesDAO = require('../model/DAO/clientes.js')

// Função para listar os filmes existentes 
const getListarClientes = async function(){
    
    let listaClientes;
    // Cria uma variavel do tipo json
    let servicosJSON = {};

    if ((listaClientes)){
        return listaClientes;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosClientes = await clientesDAO.selectAllClientes();

    
    // Verifica se existem dados retornados do DAO
    if(dadosClientes){
        if(dadosClientes.length > 0){
        // Montando a estrutura do JSOm
        servicosJSON.clientes = dadosClientes;
        servicosJSON.quantidade = dadosClientes.length;
        servicosJSON.status_code = 200;
        // Retorna o JSON montado
        return servicosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarCliente = async function(id){
    // Recebe o id do filme
    let idCliente = id;

    // Variável para criar o json do filme
    let clienteJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idCliente == '' || idCliente == undefined || isNaN(idCliente)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosClientes = await clientesDAO.selectByIdCliente(id)

        // Validação para verificar se existem dados encontrados
        if(dadosClientes){
            // Validação para verificar se existem dados de retorno
            if(dadosClientes.length > 0){
            clienteJSON.servico = dadosClientes;
            clienteJSON.status_code = 200

            return clienteJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    getBuscarCliente,
    getListarClientes
}