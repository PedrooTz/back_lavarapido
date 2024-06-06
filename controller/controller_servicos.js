// CRUD LAVA RÁPIDO
// Autor : Pedro Pedraga
// Data : 21/05/24

const message = require('../modulo/config.js')

const servicosDAO = require('../model/DAO/servicos.js')
const precoCategoriaDAO = require('../model/DAO/preco_categoria.js');
const veiculos = require('../model/DAO/veiculos.js');

// Função para listar os filmes existentes 
const getListarServicos = async function(){
    
    let listaServicos;
    // Cria uma variavel do tipo json
    let servicosJSON = {};

    if ((listaServicos)){
        return listaServicos;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosServicos = await servicosDAO.selectAllServicos();

    
    // Verifica se existem dados retornados do DAO
    if(dadosServicos){
        if(dadosServicos.length > 0){
        // Montando a estrutura do JSOm
        servicosJSON.servicos = dadosServicos;
        servicosJSON.quantidade = dadosServicos.length;
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
const getBuscarServico = async function(id){
    // Recebe o id do filme
    let idServico = id;

    // Variável para criar o json do filme
    let servicosJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idServico == '' || idServico == undefined || isNaN(idServico)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosServicos = await servicosDAO.selectByIdServico(id)

        // Validação para verificar se existem dados encontrados
        if(dadosServicos){
            // Validação para verificar se existem dados de retorno
            if(dadosServicos.length > 0){
            servicosJSON.servico = dadosServicos;
            servicosJSON.status_code = 200

            return servicosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

const setExcluirServico = async  function(id){

    try {

        let idServico = id; 
    
        if (idServico  == '' || idServico == undefined || isNaN(idServico)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await servicosDAO.selectByIdServico(idServico)
 
            if(chamarConst.length > 0){
           
                let dadosServicos = await servicosDAO.deleteServico(id)
        
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



const setInserirNovoServico = async function(dadosServicos, contentType){

  
    try{

   
        if(String(contentType).toLowerCase() == 'application/json'){
    
        
    
        // Cria a variável json
        let resultdadosServicos = {}
    
        // Validação de campos obrigatórios e consistência de dados
        if( dadosServicos.nome == ''                       || dadosServicos.nome == undefined              || dadosServicos.nome.length > 150 ||
            dadosServicos.descricao == ''  || dadosServicos.descricao == undefined || dadosServicos.descricao.length > 255 ||
            dadosServicos.foto == '' || dadosServicos.foto == undefined || dadosServicos.foto.length > 1000
        ){
            return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
         }else{
          
            // Encaminha os dados para o DAO, inserir no Banco de Dados
            let novoServico = await servicosDAO.insertServico(dadosServicos);
            let idSelect = await servicosDAO.selectIdServico();
            console.log("faf")
            dadosServicos.id = Number (idSelect[0].id)
            
            // Validação de inserção de dados no banco de dados 
            if(novoServico){
    
               
                // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                resultdadosServicos.status = message.SUCESS_CREATED_ITEM.status;
                resultdadosServicos.status_code = message.SUCESS_CREATED_ITEM.status_code;
                resultdadosServicos.message = message.SUCESS_CREATED_ITEM.message;
                resultdadosServicos.servico = dadosServicos;
    
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

    const setUpdateServico = async function(id, contentType, dadosServicos){
        try{
            let idServico = id;
            console.log(idServico)
    
            if(idServico == '' || idServico == undefined || isNaN (idServico)){
                return message.ERROR_INVALID_ID;
    
               
                
            }else{
    
            if(String(contentType).toLowerCase() == 'application/json'){
                let updateServicoJSON = {};
                
                if( dadosServicos.nome == ''                       || dadosServicos.nome == undefined              || dadosServicos.nome.length > 150 ||
                dadosServicos.descricao == ''  || dadosServicos.descricao == undefined || dadosServicos.descricao.length > 1000 ||
                dadosServicos.foto == '' || dadosServicos.foto == undefined || dadosServicos.foto.length > 1000
        ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
    
                let validateStatus = true;
    
                let servicoByiD = await servicosDAO.selectByIdServico(id)
    
                if(servicoByiD.length > 0){
                    if (validateStatus){
                        let updateServico = await servicosDAO.updateServico(id,dadosServicos);
        
                        if(updateServico){
                          
                            updateServicoJSON.servico = dadosServicos
                            updateServicoJSON.status = message.SUCESS_UPDATED_ITEM.status
                            updateServicoJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                            updateServicoJSON.message = message.SUCESS_UPDATED_ITEM.message
        
                            return updateServicoJSON;
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
    setExcluirServico,
    getBuscarServico,
    getListarServicos,
    setInserirNovoServico,
    setUpdateServico
}