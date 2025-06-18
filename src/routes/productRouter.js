const { listarProdutos, produtoPorId, alterarProduto, deletarProduto, inserirProduto } = require("../controllers/productController");

const router = require("express").Router();

//Lista todos os produtos
router.get('/search',
    // #swagger.summary = 'Lista de produtos'
    // #swagger.description = 'Retorna uma lista com todos os produtos com uma paginação dinâmica'
    listarProdutos);

//Busca produto por ID
router.get('/:id',
    // #swagger.summary = 'Busca de produto por id'
    // #swagger.description = 'Retorna um produto'
    produtoPorId);

//Cadastro de produto
router.post('/',
    // #swagger.summary = 'Registro de um novo produto'
    // #swagger.description = 'Cria um novo produto no sistema'
    inserirProduto)

//Atualização de produto
router.put('/:id',
    // #swagger.summary = 'Atualização de produto'
    // #swagger.description = 'Altualiza um produto já existente com base no id selecionado'
    alterarProduto);

//Deletar produto
router.delete('/:id',
    // #swagger.summary = 'Deleta Produto'
    // #swagger.description = 'Deleta um produto com base no id selecionado'
    deletarProduto);

module.exports = router;