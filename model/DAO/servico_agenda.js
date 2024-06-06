const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllServicoAgenda = async function(){
    

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_servico_agenda order by id desc';
    let rsServicoAgenda = await prisma.$queryRawUnsafe(sql)
    
     if(rsServicoAgenda.length > 0)
     return rsServicoAgenda;
     else
        return false


}

const selectByIdServicoAgenda =  async function(id){    
    try {

    let sql = `select * from tbl_servico_agenda where id = ${id}`

    let rsServicoAgenda = await prisma.$queryRawUnsafe(sql);
        return rsServicoAgenda;

    } catch (error) {
        return false;
        
    }
} 


module.exports = {
    selectAllServicoAgenda,
    selectByIdServicoAgenda
}