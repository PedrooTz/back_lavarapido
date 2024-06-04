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
            clienteJSON.cliente = dadosClientes;
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

const setExcluirCliente = async  function(id){

    try {

        let idCliente = id; 
    
        if (idCliente  == '' || idCliente == undefined || isNaN(idCliente)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await clientesDAO.selectByIdCliente(idCliente)
 
            if(chamarConst.length > 0){
           
                let dadosClientes = await clientesDAO.deleteCliente(id)
        
                // Validação para verificar se existem dados encontrados
                if(dadosClientes){
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
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }

}



const setinserirCliente = async function(dadosClientes, contentType){

  
    try{

   
        if(String(contentType).toLowerCase() == 'application/json'){
    
        
    
        // Cria a variável json
        let resultDadosClientes = {}
    
        // Validação de campos obrigatórios e consistência de dados
        if( dadosClientes.nome == ''                       || dadosClientes.nome == undefined              || dadosClientes.nome.length > 150 ||
            dadosClientes.data_nascimento == ''  || dadosClientes.data_nascimento == undefined || dadosClientes.data_nascimento.length > 255 ||
            dadosClientes.telefone == ''  || dadosClientes.telefone == undefined || dadosClientes.telefone.length > 255 ||
            dadosClientes.email == ''  || dadosClientes.email == undefined || dadosClientes.email.length > 255 ||
            dadosClientes.img == '' || dadosClientes.img == undefined || dadosClientes.img.length > 1000
        ){
            return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
         }else{
          
            // Encaminha os dados para o DAO, inserir no Banco de Dados
            let novoCliente = await clientesDAO.insertCliente(dadosClientes);
            let idSelect = await clientesDAO.selectIdCliente();
            dadosClientes.id = Number (idSelect[0].id)
            
            // Validação de inserção de dados no banco de dados 
            if(novoCliente){
    
               
                // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                resultDadosClientes.status = message.SUCESS_CREATED_ITEM.status;
                resultDadosClientes.status_code = message.SUCESS_CREATED_ITEM.status_code;
                resultDadosClientes.message = message.SUCESS_CREATED_ITEM.message;
                resultDadosClientes.servico = dadosClientes;
    
                return resultDadosClientes; // 201
            } else{
                return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
                
        
             }
           }
        }else{
            return message.ERROR_CONTENT_TYPE // 415 Erro no content type
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
    }
         
    }

    const setUpdateCliente = async function(id, contentType, dadosClientes){
        try{
            let idCliente = id;
            console.log(idCliente)
    
            if(idCliente == '' || idCliente == undefined || isNaN (idCliente)){
                return message.ERROR_INVALID_ID;
    
               
                
            }else{
    
            if(String(contentType).toLowerCase() == 'application/json'){
                let updateClienteJSON = {};
                
                if( dadosClientes.nome == ''                       || dadosClientes.nome == undefined              || dadosClientes.nome.length > 150 ||
                dadosClientes.data_nascimento == ''  || dadosClientes.data_nascimento == undefined || dadosClientes.data_nascimento.length > 255 ||
                dadosClientes.telefone == ''  || dadosClientes.telefone == undefined || dadosClientes.telefone.length > 255 ||
                dadosClientes.email == ''  || dadosClientes.email == undefined || dadosClientes.email.length > 255 ||
                dadosClientes.img == '' || dadosClientes.img == undefined || dadosClientes.img.length > 1000
        ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
    
                let validateStatus = true;
    
                let servicoByiD = await clientesDAO.selectByIdCliente(id)
    
                if(servicoByiD.length > 0){
                    if (validateStatus){
                        let updateServico = await clientesDAO.updateCliente(id,dadosClientes);
        
                        if(updateServico){
                          
                            updateClienteJSON.cliente = dadosClientes
                            updateClienteJSON.status = message.SUCESS_UPDATED_ITEM.status
                            updateClienteJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                            updateClienteJSON.message = message.SUCESS_UPDATED_ITEM.message
        
                            return updateClienteJSON;
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
            console.log(error)
            return message.ERROR_INTERNAL_SERVER
        }
    }

module.exports = {
    getBuscarCliente,
    getListarClientes,
    setExcluirCliente,
    setUpdateCliente,
    setinserirCliente
}