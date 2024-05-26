// CRUD LAVA RÁPIDO
// Autor : Pedro Pedraga
// Data : 21/05/24

const message = require('../modulo/config.js')

const categoriaDAO = require('../model/DAO/categoria.js')

// Função para listar os filmes existentes 
const getListarCategoria = async function(){
    
    let listaCategoria;
    // Cria uma variavel do tipo json
    let categoriaJSON = {};

    if ((listaCategoria)){
        return listaCategoria;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosCategoria = await categoriaDAO.selectAllCategorias();

    
    // Verifica se existem dados retornados do DAO
    if(dadosCategoria){
        if(dadosCategoria.length > 0){
        // Montando a estrutura do JSOm
        categoriaJSON.categorias = dadosCategoria;
        categoriaJSON.quantidade = dadosCategoria.length;
        categoriaJSON.status_code = 200;
        // Retorna o JSON montado
        return categoriaJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarCategoria = async function(id){
    // Recebe o id do filme
    let idCategoria = id;

    // Variável para criar o json do filme
    let categoriaJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosCategoria = await categoriaDAO.selectByIdCategoria(id)

        // Validação para verificar se existem dados encontrados
        if(dadosCategoria){
            // Validação para verificar se existem dados de retorno
            if(dadosCategoria.length > 0){
            categoriaJSON.categoria = dadosCategoria;
            categoriaJSON.status_code = 200

            return categoriaJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    getBuscarCategoria,
    getListarCategoria
}