// CRUD Serviços
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Função para listar os filmes existentes 
const deleteVeiculo = async function(id) {

    try {
        // Realiza a busca do filme pelo ID
        let sql = `delete from tbl_veiculo where id = ${id}`
    
        // Executa no banco de dados o script sql
        let rsVeiculos = await prisma.$queryRawUnsafe(sql);
            return rsVeiculos;
    
        } catch (error) {
            console.log(error)
            return false
            
        }

}

// Listar todos os filmes presentes na tabela 
const selectAllVeiculo = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_veiculo order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_filme) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsVeiculos
    let rsVeiculos = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsVeiculos.length > 0)
     return rsVeiculos;
     else
        return false

       


}

// Listar filme filtrando pelo ID
const selectByIdVeiculo =  async function(id){    
    try {
    // Realiza a busca do filme pelo ID
    let sql = `select * from tbl_veiculo where id = ${id}`

    // Executa no banco de dados o script sql
    let rsVeiculos = await prisma.$queryRawUnsafe(sql);
        return rsVeiculos;

    } catch (error) {
        return false;
        
    }
} 

const selectIdVeiculo = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_veiculo limit 1`;

    let classificacaoId = await prisma.$queryRawUnsafe(sql)
     return classificacaoId
    } catch (error) {
        return false
        
    }   
}

const insertVeiculo =  async function(dadosServicos) {
    
    try {
     let sql = `insert into tbl_veiculo(nome, placa, modelo, tbl_cliente_id) values ('${dadosServicos.nome}', '${dadosServicos.placa}', '${dadosServicos.modelo}', ${dadosServicos.tbl_cliente_id} )`
            
     
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {
        console.log(error)
        return false;
        
    }
}

const updateVeiculo =  async function(id, dadosVeiculos) {
    
    try{
        let sql;

            sql = `UPDATE tbl_veiculo SET nome = '${dadosVeiculos.nome}',
                placa = '${dadosVeiculos.placa}',
                modelo = '${dadosVeiculos.modelo}',
                tbl_cliente_id = '${dadosVeiculos.tbl_cliente_id}'
                where id = ${id}`
        
                console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}



module.exports = {
    selectAllVeiculo,
    selectByIdVeiculo,
    selectIdVeiculo,
    insertVeiculo,
    deleteVeiculo,
    updateVeiculo
}