// CRUD preco categoria
// Autor: Pedro Pedraga
// Data: 21/05/24

const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllPrecoCategorias = async function(){        
  
    // Script sql para listar todos os registros
    let sql = `select * from tbl_preco_categoria order by id desc`;
    let rsPrecoCategoria = await prisma.$queryRawUnsafe(sql)
    
     if(rsPrecoCategoria.length > 0)
     return rsPrecoCategoria;
     else
        return false

}

const selectByIdPrecoCategoria =  async function(id){    
    try {

    let sql = `select * from tbl_preco_categoria where id = ${id}`

    let rsPrecoCategoria = await prisma.$queryRawUnsafe(sql);
        return rsPrecoCategoria;

    } catch (error) {
        return false;
        
    }
} 

module.exports = {
    selectAllPrecoCategorias,
    selectByIdPrecoCategoria
}