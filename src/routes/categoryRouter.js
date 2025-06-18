const { listarCategorias, categoriaPorId, inserirCategoria, alterarCategoria, deletarCategoria } = require("../controllers/categoryController");
const authMiddleware = require('../middleware/AuthMiddleware.js')
const router = require("express").Router();

// router.use(authMiddleware)

//Lista todas as categorias
router.get('/search',
    // #swagger.summary = 'Lista de categoria'
    // #swagger.description = 'Retorna uma lista de categorias'
    listarCategorias);

//Busca categoria por ID
router.get('/:id',
    // #swagger.summary = 'Busca de categoria por id'
    // #swagger.description = 'Retorna uma categoria'
    categoriaPorId);

//Cadastro de categoria
router.post('/', authMiddleware,
    // #swagger.summary = 'Registro de uma nova categoria'
    // #swagger.description = 'Cria uma nova categoria no sistema'
    inserirCategoria)

//Atualização de categoria
router.put('/:id', authMiddleware,
    // #swagger.summary = 'Atualização de categoria'
    // #swagger.description = 'Altualiza uma categoria já existente com base no id selecionado'
    alterarCategoria);

//Deletar categoria
router.delete('/:id',authMiddleware, 
    // #swagger.summary = 'Deleta categoria'
    // #swagger.description = 'Deleta uma categoria com base no id selecionado'
    deletarCategoria);

module.exports = router;