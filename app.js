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

    const controllerVeiculos = require('./controller/controller_veiculos');


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






  


app.listen(8080, function(){
    console.log('Tá funcionando, testa aí');
})

