const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllClienteAgenda = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_cliente_agenda order by id desc';
    let rsClienteAgenda = await prisma.$queryRawUnsafe(sql)
    
     if(rsClienteAgenda.length > 0)
     return rsClienteAgenda;
     else
        return false


}

const selectByIdClienteAgenda =  async function(id){    
    try {

    let sql = `select * from tbl_cliente_agenda where id = ${id}`

    let rsClienteAgenda = await prisma.$queryRawUnsafe(sql);
        return rsClienteAgenda;

    } catch (error) {
        return false;
        
    }
} 

module.exports = {
    selectAllClienteAgenda,
    selectByIdClienteAgenda
}