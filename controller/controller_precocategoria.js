const precoCategoriaDAO = require('../model/DAO/preco_categoria.js')
const categoriaDAO = require('../model/DAO/categoria.js')
const servicoDAO = require('../model/DAO/servicos.js')

const message = require('../modulo/config.js')

const getListarPrecos = async function(){
    
    let listaPrecos;
    // Cria uma variavel do tipo json
    let precosJSON = {};

    if ((listaPrecos)){
        return listaPrecos;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosPreco = await precoCategoriaDAO.selectAllPrecoCategorias();

    
    // Verifica se existem dados retornados do DAO
    if(dadosPreco){
        if(dadosPreco.length > 0){
            for(let preco of dadosPreco){
                preco.categoria = await categoriaDAO.selectByIdCategoria(preco.tbl_categoria_id)
                preco.servico = await servicoDAO.selectByIdServico(preco.tbl_servicos_id)
                delete preco.tbl_categoria_id
                delete preco.tbl_servicos_id
            }
        // Montando a estrutura do JSOm
        precosJSON.preços = dadosPreco;
        precosJSON.quantidade = dadosPreco.length;
        precosJSON.status_code = 200;
        // Retorna o JSON montado
        return precosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

const getBuscarPrecos = async function(id){
    // Recebe o id do filme
    let idPreco = id;

    // Variável para criar o json do filme
    let precosJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idPreco == '' || idPreco == undefined || isNaN(idPreco)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosPreco = await precoCategoriaDAO.selectByIdPrecoCategoria(id)

        // Validação para verificar se existem dados encontrados
        if(dadosPreco){
            // Validação para verificar se existem dados de retorno
            if(dadosPreco.length > 0){
                for(let preco of dadosPreco){
                    preco.categoria = await categoriaDAO.selectByIdCategoria(preco.tbl_categoria_id)
                    preco.servico = await servicoDAO.selectByIdServico(preco.tbl_servicos_id)
                    delete preco.tbl_categoria_id
                    delete preco.tbl_servicos_id
                }
            precosJSON.categoria = dadosPreco;
            precosJSON.status_code = 200

            return precosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    getBuscarPrecos,
    getListarPrecos
}