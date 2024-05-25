// CRUD Serviços
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Função para listar os filmes existentes 
const deleteServico = async function(id) {

    try {
        // Realiza a busca do filme pelo ID
        let sql = `delete from tbl_servico where id = ${id}`
    
        // Executa no banco de dados o script sql
        let rsServicos = await prisma.$queryRawUnsafe(sql);
            return rsServicos;
    
        } catch (error) {
            return false
            
        }

}

// Listar todos os filmes presentes na tabela 
const selectAllServicos = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_servico order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_filme) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsServicoss
    let rsServicoss = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsServicoss.length > 0)
     return rsServicoss;
     else
        return false

       


}

// Listar filme filtrando pelo ID
const selectByIdServico =  async function(id){    
    try {
    // Realiza a busca do filme pelo ID
    let sql = `select * from tbl_servico where id = ${id}`

    // Executa no banco de dados o script sql
    let rsServicos = await prisma.$queryRawUnsafe(sql);
        return rsServicos;

    } catch (error) {
        return false;
        
    }
} 

const selectIdServico = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_servico limit 1`;

    let classificacaoId = await prisma.$queryRawUnsafe(sql)
     return classificacaoId
    } catch (error) {
        return false
        
    }   
}

const insertServico =  async function(dadosServicos) {
    
    try {

     let sql = `insert into tbl_servico(nome, descricao, foto) values ('${dadosServicos.nome}', '${dadosServicos.descricao}', '${dadosServicos.foto}' )`
            
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

const updateServico =  async function(id, dadosServicos) {
    
    try{
        let sql;

            sql = `UPDATE tbl_servico SET nome = '${dadosServicos.nome}',
                descricao = '${dadosServicos.descricao}',
                foto = '${dadosServicos.foto}'
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
    selectAllServicos,
    selectByIdServico,
    deleteServico,
    selectIdServico,
    insertServico,
    updateServico
}