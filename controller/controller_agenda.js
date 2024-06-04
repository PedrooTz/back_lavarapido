// CRUD LAVA RÁPIDO
// Autor : Pedro Pedraga
// Data : 21/05/24

const message = require('../modulo/config.js')

const agendaDAO = require('../model/DAO/agenda.js')

// Função para listar os filmes existentes 
const getListarAgenda = async function(){
    
    let listaAgenda;
    // Cria uma variavel do tipo json
    let agendaJSON = {};

    if ((listaAgenda)){
        return listaAgenda;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosAgenda = await agendaDAO.selectAllAgenda();

    
    // Verifica se existem dados retornados do DAO
    if(dadosAgenda){
        if(dadosAgenda.length > 0){
        // Montando a estrutura do JSOm
        agendaJSON.dias = dadosAgenda;
        agendaJSON.quantidade = dadosAgenda.length;
        agendaJSON.status_code = 200;
        // Retorna o JSON montado
        return agendaJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarAgenda = async function(id){
    // Recebe o id do filme
    let idAgenda = id;

    // Variável para criar o json do filme
    let agendaJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idAgenda == '' || idAgenda == undefined || isNaN(idAgenda)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosAgenda = await agendaDAO.selectByIdAgenda(id)

        // Validação para verificar se existem dados encontrados
        if(dadosAgenda){
            // Validação para verificar se existem dados de retorno
            if(dadosAgenda.length > 0){
            agendaJSON.dia = dadosAgenda;
            agendaJSON.status_code = 200

            return agendaJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

const setExcluirAgenda = async  function(id){

    try {

        let idAgenda = id; 
    
        if (idAgenda  == '' || idAgenda == undefined || isNaN(idAgenda)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await agendaDAO.selectByIdAgenda(idAgenda)
 
            if(chamarConst.length > 0){
           
                let dadosAgenda = await agendaDAO.deleteAgenda(id)
        
                // Validação para verificar se existem dados encontrados
                if(dadosAgenda){
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



const setInserirNovaAgenda = async function(dadosAgenda, contentType){

  
    try{

   
        if(String(contentType).toLowerCase() == 'application/json'){
    
        
    
        // Cria a variável json
        let resultDadosAgenda = {}
    
        // Validação de campos obrigatórios e consistência de dados
        if( dadosAgenda.dia == ''                       || dadosAgenda.dia == undefined              || dadosAgenda.dia.length > 150
        ){
            return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
         }else{
          
            // Encaminha os dados para o DAO, inserir no Banco de Dados
            let novaAgenda = await agendaDAO.insertAgenda(dadosAgenda);
            let idSelect = await agendaDAO.selectIdAgenda();
            dadosAgenda.id = Number (idSelect[0].id)
            
            // Validação de inserção de dados no banco de dados 
            if(novaAgenda){
    
               
                // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                resultDadosAgenda.status = message.SUCESS_CREATED_ITEM.status;
                resultDadosAgenda.status_code = message.SUCESS_CREATED_ITEM.status_code;
                resultDadosAgenda.message = message.SUCESS_CREATED_ITEM.message;
                resultDadosAgenda.dia = dadosAgenda;
    
                return resultDadosAgenda; // 201
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

    const setUpdateAgenda = async function(id, contentType, dadosAgenda){
        try{
            let idAgenda = id;
            console.log(idAgenda)
    
            if(idAgenda == '' || idAgenda == undefined || isNaN (idAgenda)){
                return message.ERROR_INVALID_ID;
    
               
                
            }else{
    
            if(String(contentType).toLowerCase() == 'application/json'){
                let updateAgendaJSON = {};
                
                if( dadosAgenda.dia == ''                       || dadosAgenda.dia == undefined              || dadosAgenda.dia.length > 150 
        ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
    
                let validateStatus = true;
    
                let agendaById = await agendaDAO.selectByIdAgenda(id)
    
                if(agendaById.length > 0){
                    if (validateStatus){
                        let updateAgenda = await agendaDAO.updateAgenda(id,dadosAgenda);
        
                        if(updateAgenda){
                          
                            updateAgendaJSON.categoria = dadosAgenda
                            updateAgendaJSON.status = message.SUCESS_UPDATED_ITEM.status
                            updateAgendaJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                            updateAgendaJSON.message = message.SUCESS_UPDATED_ITEM.message
        
                            return updateAgendaJSON;
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
    getBuscarAgenda,
    getListarAgenda,
    setExcluirAgenda,
    setInserirNovaAgenda,
    setUpdateAgenda
}