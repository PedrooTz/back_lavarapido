// CRUD Serviços
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Listar todos os filmes presentes na tabela 
const selectAllClientes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_cliente order by id desc';

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsClientes
    let rsClientes = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsClientes.length > 0)
     return rsClientes;
     else
        return false

       


}

// Listar filme filtrando pelo ID
const selectByIdCliente =  async function(id){    
    try {
    // Realiza a busca do filme pelo ID
    let sql = `select * from tbl_cliente where id = ${id}`

    // Executa no banco de dados o script sql
    let rsClientes = await prisma.$queryRawUnsafe(sql);
        return rsClientes;

    } catch (error) {
        return false;
        
    }
} 

const deleteCliente = async function(id) {

    try {
        // Realiza a busca do filme pelo ID
        let sql = `delete from tbl_cliente where id = ${id}`
    
        // Executa no banco de dados o script sql
        let rsClientes = await prisma.$queryRawUnsafe(sql);
            return rsClientes;
    
        } catch (error) {
            return false
            
        }

}

const selectIdCliente = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_cliente limit 1`;

    let classificacaoId = await prisma.$queryRawUnsafe(sql)
     return classificacaoId
    } catch (error) {
        return false
        
    }   
}


const insertCliente =  async function(dadosClientes) {
    
    try {

     let sql = `insert into tbl_cliente(nome, data_nascimento, telefone, email, img) values ('${dadosClientes.nome}', '${dadosClientes.data_nascimento}', '${dadosClientes.telefone}', '${dadosClientes.email}', '${dadosClientes.img}')`
            
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

const updateCliente =  async function(id, dadosClientes) {
    
    try{
        let sql;

            sql = `UPDATE tbl_cliente SET nome = '${dadosClientes.nome}',
                data_nascimento = '${dadosClientes.data_nascimento}',
                telefone = '${dadosClientes.telefone}',
                email = '${dadosClientes.email}',
                img = '${dadosClientes.img}'
                where id = ${id}`
        
                console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        console.log(error)
        return false

    }
}


module.exports = {
    selectAllClientes,
    selectByIdCliente,
    deleteCliente,
    insertCliente,
    selectIdCliente,
    updateCliente
}
