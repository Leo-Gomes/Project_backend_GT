const { registrar, login, alterarUsuario, deletarUsuario, usuarioPorId } = require("../controllers/userController");

const router = require("express").Router();

router.get('/:id',
    // #swagger.summary = 'Busca de usuário por id'
    // #swagger.description = 'Retorna um usuário'
    usuarioPorId);

router.post('/register', 
    // #swagger.summary = 'Registro de um novo usuário'
    // #swagger.description = 'Cria um novo usuário no sistema com nome, sobrenome, email e senha válidos'
    registrar);

router.post('/login', 
    // #swagger.summary = 'Login de usuário'
    // #swagger.description = 'Autentica um usuário com email e senha. Retorna um token JWT'
    // #swagger.responses[200] = {description: 'login'}
    // #swagger.responses[401] = 'Autentica um usuário com email e senha. Retorna um token JWT'
    login);

    router.put('/:id', 
    //#swagger.summary = 'Altera as informações de usuário'
    alterarUsuario);

    router.delete('/:id', 
    // #swagger.summary = 'Deleta usuário'
    // #swagger.description = 'Deleta um usuário com base no id selecionado'
    deletarUsuario);

module.exports = router;