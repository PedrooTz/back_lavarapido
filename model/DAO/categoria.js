// CRUD Serviços
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Listar todos os filmes presentes na tabela 
const selectAllCategorias = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_categoria order by id desc';
    let rsCategoria = await prisma.$queryRawUnsafe(sql)
    
     if(rsCategoria.length > 0)
     return rsCategoria;
     else
        return false


}

const selectByIdCategoria =  async function(id){    
    try {

    let sql = `select * from tbl_cliente where id = ${id}`

    let rsCategoria = await prisma.$queryRawUnsafe(sql);
        return rsCategoria;

    } catch (error) {
        return false;
        
    }
} 
const deleteCategoria =  async function(id){    
    try {

    let sql = `delete from tbl_categoria where id = ${id}`

    let rsCategoria = await prisma.$queryRawUnsafe(sql);
        return rsCategoria;

    } catch (error) {
        return false;
        
    }
}
const selectIdCategoria = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_categoria limit 1`;

    let categoriaId = await prisma.$queryRawUnsafe(sql)
     return categoriaId
    } catch (error) {
        return false
        
    }   
}

const insertCategoria =  async function(dadosCategoria) {
    
    try {

     let sql = `insert into tbl_categoria(nome, descricao) values ('${dadosCategoria.nome}', '${dadosCategoria.descricao}')`
            
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

const updateCategoria =  async function(id, dadosCategoria) {
    
    try{
        let sql;

            sql = `UPDATE tbl_categoria SET nome = '${dadosCategoria.nome}',
                descricao = '${dadosCategoria.descricao}'
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
    selectAllCategorias,
    selectByIdCategoria,
    selectIdCategoria,
    insertCategoria,
    updateCategoria,
    deleteCategoria
}
