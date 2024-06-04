// CRUD Serviços
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Listar todos os filmes presentes na tabela 
const selectAllAgenda = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_agenda order by id desc';
    let rsAgenda = await prisma.$queryRawUnsafe(sql)
    
     if(rsAgenda.length > 0)
     return rsAgenda;
     else
        return false


}

const selectByIdAgenda =  async function(id){    
    try {

    let sql = `select * from tbl_agenda where id = ${id}`

    let rsAgenda = await prisma.$queryRawUnsafe(sql);
        return rsAgenda;

    } catch (error) {
        return false;
        
    }
} 
const deleteAgenda =  async function(id){    
    try {

    let sql = `delete from tbl_agenda where id = ${id}`

    let rsAgenda = await prisma.$queryRawUnsafe(sql);
        return rsAgenda;

    } catch (error) {
        return false;
        
    }
}
const selectIdAgenda = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_agenda limit 1`;

    let agendaId = await prisma.$queryRawUnsafe(sql)
     return agendaId
    } catch (error) {
        return false
        
    }   
}

const insertAgenda =  async function(dadosAgenda) {
    
    try {

     let sql = `insert into tbl_agenda(nome, descricao) values ('${dadosAgenda.nome}', '${dadosAgenda.descricao}')`
            
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

const updateAgenda =  async function(id, dadosAgenda) {
    
    try{
        let sql;

            sql = `UPDATE tbl_agenda SET nome = '${dadosAgenda.dia}',
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
    selectAllAgenda,
    selectByIdAgenda,
    selectIdAgenda,
    deleteAgenda,
    insertAgenda,updateAgenda
}
