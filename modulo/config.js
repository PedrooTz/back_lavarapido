/******************* MENSAGENS DE ERRO *********************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message:'O id informado na requisição não é válido'}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message:'Existem campos obrigatórios que não foram preenchidos corretamente'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message:'Nenhum item encontrado na requisição'}

const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message:'Ocorreu um erro no servidor interno do Banco de Dados, por favor contate o administrador para solucionar'}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message:'Ocorreu um erro no servidor interno na camada de negócio da API, por favor contate o administrador para solucionar'}

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message:'O Content-Type da requisição não é suportado. Precisa ser enviado dados no formato application/json'}

/******************* MENSAGENS DE SUCESSO *********************/

const SUCESS_CREATED_ITEM = {status: true, status_code: 200, message:'Item inserido com sucesso!'}

const SUCESS_DELETED_ITEM = {status: true, status_code: 200, message:'Item deletado com sucesso!'}

const SUCESS_UPDATED_ITEM = {status: true, status_code: 200, message:'Item atualizado com sucesso!'}


