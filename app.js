/********************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 ********************************************************/

/**********************************************
 * Para realizar a conexão com o banco de dados 
 * precisamos utilizar uma dependencia:
 *    - SEQUELIZE ORM
 *    - PRISMA    ORM 
 *    - FASTFY    ORM
 * 
 * Prisma - Para utilizar o prisma é necessário os comandos abaixos
 *     npm install prisma --save
 *     npm install @prisma/client --save
 *     
 * Para inicializar o prisma:
 *     npx prisma init
 * 
 *******************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json();

//request - Receber dados
//response - Devolve dados

// *************************** Imports de arquivos e bibliotecas ************************************ //

    const controllerServicos = require('./controller/controller_servicos.js');

    const controllerVeiculos = require('./controller/controller_veiculos.js');

    const controllerClientes = require('./controller/controller_clientes.js')

    const controllerCategorias = require('./controller/controller_categoria.js')


// ************************************************************************************************* //
//Função para configurar as permissões do cors
app.use((request, response, next)=>{
    //Configura quem poderá fazer requisições na API (* - libera para todos | IP restringe o acesso)
    response.header('Access-Control-Allow-Origin', '*');
    //Configura os metodos que poderão ser utilizados na API (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());

    next();
})

app.get('/v1/lavarapido/servicos', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosServicos = await controllerServicos.getListarServicos();

    // Validação para verificar se existem dados
    if(dadosServicos){
        response.json(dadosServicos)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v1/lavarapido/servico/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idServico = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosServicos = await controllerServicos.getBuscarServico(idServico);
  
     response.status(dadosServicos.status_code);
     response.json(dadosServicos);
   
});

app.post('/v1/lavarapido/insertservico', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerServicos.setInserirNovoServico(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
});

// Deleta um filme a partir de seu ID
app.delete('/v1/lavarapido/deleteservico/:id', cors(), async function(request, response, next){

    let idServico = request.params.id;

    let dadosServicos = await controllerServicos.setExcluirServico(idServico);

    response.status(dadosServicos.status_code);
    response.json(dadosServicos);
});

app.put('/v1/lavarapido/updateservico/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idServico = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosServicos = await controllerServicos.setUpdateServico(idServico, contentType, dadosBody);

    response.status(dadosServicos.status_code);
    response.json(dadosServicos)
})

/*******************************************************************************/
/*******************************************************************************/
                                // CRUD VEÍCULOS
/*******************************************************************************/
/*******************************************************************************/




app.get('/v1/lavarapido/veiculos', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosVeiculos = await controllerVeiculos.getListarVeiculos();

    // Validação para verificar se existem dados
    if(dadosVeiculos){
        response.json(dadosVeiculos)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});


app.get('/v1/lavarapido/veiculo/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idVeiculo = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosVeiculos = await controllerVeiculos.getBuscarVeiculo(idVeiculo);
  
     response.status(dadosVeiculos.status_code);
     response.json(dadosVeiculos);
   
});

app.post('/v1/lavarapido/insertveiculo', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let dadosVeiculos = await controllerVeiculos.setInserirNovoVeiculo(dadosBody, contentType);

   response.status(dadosVeiculos.status_code);
   response.json(dadosVeiculos);
});

// Deleta um filme a partir de seu ID
app.delete('/v1/lavarapido/deleteveiculo/:id', cors(), async function(request, response, next){

    let idVeiculo = request.params.id;

    let dadosVeiculos = await controllerVeiculos.setExcluirVeiculo(idVeiculo);

    response.status(dadosVeiculos.status_code);
    response.json(dadosVeiculos);
});

// Faz o update de um filme existente
app.put('/v1/lavarapido/updateveiculo/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idVeiculo = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosVeiculos = await controllerVeiculos.setUpdateVeiculo(idVeiculo, contentType, dadosBody);

    response.status(dadosVeiculos.status_code);
    response.json(dadosVeiculos)
})

/*******************************************************************************/
/*******************************************************************************/
                                // CRUD CLIENTES
/*******************************************************************************/
/*******************************************************************************/

app.get('/v1/lavarapido/clientes', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosClientes = await controllerClientes.getListarClientes();

    // Validação para verificar se existem dados
    if(dadosClientes){
        response.json(dadosClientes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});


app.get('/v1/lavarapido/cliente/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idCliente = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosClientes = await controllerClientes.getBuscarCliente(idCliente);
  
     response.status(dadosClientes.status_code);
     response.json(dadosClientes);
   
});

app.delete('/v1/lavarapido/deletecliente/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idCliente = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosClientes = await controllerClientes.setExcluirCliente(idCliente);
  
     response.status(dadosClientes.status_code);
     response.json(dadosClientes);
   
});


app.post('/v1/lavarapido/insertcliente', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let dadosClientes = await controllerClientes.setinserirCliente(dadosBody, contentType);

   response.status(dadosClientes.status_code);
   response.json(dadosClientes);
});

app.put('/v1/lavarapido/updatecliente/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idCliente = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosClientes = await controllerClientes.setUpdateCliente(idCliente, contentType, dadosBody);

    response.status(dadosClientes.status_code);
    response.json(dadosClientes)
})



/*******************************************************************************/
/*******************************************************************************/
                                // CRUD CATEGORIAS
/*******************************************************************************/
/*******************************************************************************/

app.get('/v1/lavarapido/categorias', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosCategoria = await controllerCategorias.getListarCategoria();

    // Validação para verificar se existem dados
    if(dadosCategoria){
        response.json(dadosCategoria);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});


app.get('/v1/lavarapido/categoria/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idCategoria = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosCategoria = await controllerCategorias.getBuscarCategoria(idCategoria);
  
     response.status(dadosCategoria.status_code);
     response.json(dadosCategoria);
   
});

app.delete('/v1/lavarapido/deletecategoria/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idCategoria = request.params.id;
  
    // Solicita para a controller o ator filtrando pelo id
    let dadosCategoria = await controllerCategorias.setExcluirCategoria(idCategoria);
  
     response.status(dadosCategoria.status_code);
     response.json(dadosCategoria);
   
});

app.post('/v1/lavarapido/insertcategoria', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let dadosCategoria = await controllerCategorias.setInserirNovaCategoria(dadosBody, contentType);

   response.status(dadosCategoria.status_code);
   response.json(dadosCategoria);
});


app.put('/v1/lavarapido/updatecategoria/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idCategoria = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosCategoria = await controllerCategorias.setUpdateCategoria(idCategoria, contentType, dadosBody);

    response.status(dadosCategoria.status_code);
    response.json(dadosCategoria)
})






  


app.listen(8080, function(){
    console.log('Tá funcionando, testa aí');
})

