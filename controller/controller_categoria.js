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

const setExcluirCategoria = async  function(id){

    try {

        let idCategoria = id; 
    
        if (idCategoria  == '' || idCategoria == undefined || isNaN(idCategoria)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await categoriaDAO.selectByIdCategoria(idCategoria)
 
            if(chamarConst.length > 0){
           
                let dadosServicos = await categoriaDAO.deleteCategoria(id)
        
                // Validação para verificar se existem dados encontrados
                if(dadosServicos){
                    // Validação para verificar se existem dados de retorno
                 
                    return message.SUCESS_DELETED_ITEM; //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
        
            }else{
                return message.ERROR_NOT_FOUND
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}



const setInserirNovaCategoria = async function(dadosCategoria, contentType){

  
    try{

   
        if(String(contentType).toLowerCase() == 'application/json'){
    
        
    
        // Cria a variável json
        let resultDadosCategoria = {}
    
        // Validação de campos obrigatórios e consistência de dados
        if( dadosCategoria.nome == ''                       || dadosCategoria.nome == undefined              || dadosCategoria.nome.length > 150 ||
            dadosCategoria.descricao == ''  || dadosCategoria.descricao == undefined || dadosCategoria.descricao.length > 255
        ){
            return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
         }else{
          
            // Encaminha os dados para o DAO, inserir no Banco de Dados
            let novoServico = await categoriaDAO.insertCategoria(dadosCategoria);
            let idSelect = await categoriaDAO.selectIdCategoria();
            dadosCategoria.id = Number (idSelect[0].id)
            
            // Validação de inserção de dados no banco de dados 
            if(novoServico){
    
               
                // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                resultDadosCategoria.status = message.SUCESS_CREATED_ITEM.status;
                resultDadosCategoria.status_code = message.SUCESS_CREATED_ITEM.status_code;
                resultDadosCategoria.message = message.SUCESS_CREATED_ITEM.message;
                resultDadosCategoria.categoria = dadosCategoria;
    
                return resultdadosServicos; // 201
            } else{
                return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
                
        
             }
           }
        }else{
            return message.ERROR_CONTENT_TYPE // 415 Erro no content type
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
    }
         
    }

    const setUpdateCategoria = async function(id, contentType, dadosCategoria){
        try{
            let idCategoria = id;
            console.log(idCategoria)
    
            if(idCategoria == '' || idCategoria == undefined || isNaN (idCategoria)){
                return message.ERROR_INVALID_ID;
    
               
                
            }else{
    
            if(String(contentType).toLowerCase() == 'application/json'){
                let updateCategoriaJson = {};
                
                if( dadosCategoria.nome == ''                       || dadosCategoria.nome == undefined              || dadosCategoria.nome.length > 150 ||
                dadosCategoria.descricao == ''  || dadosCategoria.descricao == undefined || dadosCategoria.descricao.length > 1000
        ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
    
                let validateStatus = true;
    
                let servicoByiD = await categoriaDAO.selectByIdCategoria(id)
    
                if(servicoByiD.length > 0){
                    if (validateStatus){
                        let updateServico = await categoriaDAO.updateCategoria(id,dadosCategoria);
        
                        if(updateServico){
                          
                            updateCategoriaJson.categoria = dadosCategoria
                            updateCategoriaJson.status = message.SUCESS_UPDATED_ITEM.status
                            updateCategoriaJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                            updateCategoriaJson.message = message.SUCESS_UPDATED_ITEM.message
        
                            return updateCategoriaJson;
                        } else {
                             return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }
            } else {
                return message.ERROR_CONTENT_TYPE
            }
            }
    
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER
        }
    }

module.exports = {
    getBuscarCategoria,
    getListarCategoria,
    setExcluirCategoria,
    setInserirNovaCategoria,
    setUpdateCategoria
}