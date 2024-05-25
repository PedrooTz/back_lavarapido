// Listar todos os filmes presentes na tabela 
const selectAllClientes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_cliente order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_filme) = Encaminha o script do banco 

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
module.exports = {
    selectAllClientes,
    selectByIdCliente
}
