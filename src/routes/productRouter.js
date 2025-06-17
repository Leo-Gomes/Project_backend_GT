const { listarProdutos, produtoPorId, alterarProduto, deletarProduto, inserirProduto } = require("../controllers/productController");

const router = require("express").Router();

//Lista todos os produtos
router.get('/search',
    // #swagger.summary = 'Registro de um novo usuário'
    // #swagger.description = 'Cria um novo usuário no sistema com nome, sobrenome, email e senha válidos'
    listarProdutos);

//Busca produto por ID
router.get('/:id',
    // #swagger.summary = 'Login de usuário'
    // #swagger.description = 'Autentica um usuário com email e senha. Retorna um token JWT'
    // #swagger.responses[200] = {description: 'login'}
    // #swagger.responses[401] = 'Autentica um usuário com email e senha. Retorna um token JWT'
    produtoPorId);

//Cadastro de produto
router.post('/', inserirProduto)

//Atualização de produto
router.put('/:id',
    //#swagger.summary = 'Altera as informações de usuário'
    alterarProduto);

//Deletar produto
router.delete('/:id',
    //#swagger.summary = 'Deleta o usuário por ID'
    deletarProduto);

module.exports = router;