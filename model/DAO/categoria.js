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
module.exports = {
    selectAllCategorias,
    selectByIdCategoria
}
