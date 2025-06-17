const { listarCategorias, categoriaPorId, inserirCategoria, alterarCategoria, deletarCategoria } = require("../controllers/categoryController");

const router = require("express").Router();

//Lista todas as categorias
router.get('/search',
    // #swagger.summary = 'Registro de um novo usuário'
    // #swagger.description = 'Cria um novo usuário no sistema com nome, sobrenome, email e senha válidos'
    listarCategorias);

//Busca categoria por ID
router.get('/:id',
    // #swagger.summary = 'Login de usuário'
    // #swagger.description = 'Autentica um usuário com email e senha. Retorna um token JWT'
    // #swagger.responses[200] = {description: 'login'}
    // #swagger.responses[401] = 'Autentica um usuário com email e senha. Retorna um token JWT'
    categoriaPorId);

//Cadastro de categoria
router.post('/', inserirCategoria)

//Atualização de categoria
router.put('/:id',
    //#swagger.summary = 'Altera as informações de usuário'
    alterarCategoria);

//Deletar categoria
router.delete('/:id',
    //#swagger.summary = 'Deleta o usuário por ID'
    deletarCategoria);

module.exports = router;