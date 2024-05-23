// CRUD LAVA RÁPIDO
// Autor : Pedro Pedraga
// Data : 21/05/24

const message = require('../modulo/config.js')

const veiculoDAO = require('../model/DAO/veiculos.js')

// Função para listar os filmes existentes 
const getListarVeiculos = async function(){
    
    let listaVeiculos;
    // Cria uma variavel do tipo json
    let veiculosJSON = {};

    if ((listaVeiculos)){
        return listaVeiculos;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosVeiculos = await veiculoDAO.selectAllVeiculo();

    
    // Verifica se existem dados retornados do DAO
    if(dadosVeiculos){
        if(dadosVeiculos.length > 0){
        // Montando a estrutura do JSOm
        veiculosJSON.veiculos = dadosVeiculos;
        veiculosJSON.quantidade = dadosVeiculos.length;
        veiculosJSON.status_code = 200;
        // Retorna o JSON montado
        return veiculosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}

//Função para buscar um filme pelo id
const getBuscarVeiculo = async function(id){
    // Recebe o id do filme
    let idVeiculo = id;

    // Variável para criar o json do filme
    let veiculosJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idVeiculo == '' || idVeiculo == undefined || isNaN(idVeiculo)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do filme pelo iD
        let dadosVeiculos = await veiculoDAO.selectByIdVeiculo(id)

        // Validação para verificar se existem dados encontrados
        if(dadosVeiculos){
            // Validação para verificar se existem dados de retorno
            if(dadosVeiculos.length > 0){
            veiculosJSON.veiculo = dadosVeiculos;
            veiculosJSON.status_code = 200

            return veiculosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

const setExcluirVeiculo = async  function(id){
            try {
              
                let idVeiculo = id;
                
        
                if(idVeiculo == '' || idVeiculo == undefined || isNaN(idVeiculo)){
                    return message.ERROR_INVALID_ID;
                }else{
                    let chamarConst = await veiculoDAO.selectByIdVeiculo(idVeiculo)
                    
                    if(chamarConst.length > 0){
                        let dadosVeiculos = await veiculoDAO.deleteVeiculo(id)
        
                        if(dadosVeiculos){
                            return message.SUCESS_DELETED_ITEM
                        }else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    
                }else {
                    return message.ERROR_NOT_FOUND
                }
            }
            } catch (error) {
                return message.ERROR_INTERNAL_SERVER
            }
        }



const setInserirNovoVeiculo = async function(dadosVeiculos, contentType){

  
    try{

   
        if(String(contentType).toLowerCase() == 'application/json'){
    
        
    
        // Cria a variável json
        let resultDadosVeiculos = {}
    
        // Validação de campos obrigatórios e consistência de dados
        if( dadosVeiculos.nome == ''                       || dadosVeiculos.nome == undefined              || dadosVeiculos.nome.length > 150 ||
            dadosVeiculos.placa == ''  || dadosVeiculos.placa == undefined || dadosVeiculos.placa.length > 8 ||
            dadosVeiculos.modelo == '' || dadosVeiculos.modelo == undefined || dadosVeiculos.modelo.length > 1000
        ){
            return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
         }else{
          
            // Encaminha os dados para o DAO, inserir no Banco de Dados
            let novoVeiculo  = await veiculoDAO.insertVeiculo(dadosVeiculos);
            let idSelect = await veiculoDAO.selectIdVeiculo();
            dadosVeiculos.id = Number (idSelect[0].id)
            
            // Validação de inserção de dados no banco de dados 
            if(novoVeiculo){
    
               
                // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
                resultDadosVeiculos.status = message.SUCESS_CREATED_ITEM.status;
                resultDadosVeiculos.status_code = message.SUCESS_CREATED_ITEM.status_code;
                resultDadosVeiculos.message = message.SUCESS_CREATED_ITEM.message;
                resultDadosVeiculos.veiculo = dadosVeiculos;
    
                return resultDadosVeiculos; // 201
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
module.exports = {
    setExcluirVeiculo,
    getBuscarVeiculo,
    getListarVeiculos,
    setInserirNovoVeiculo
}