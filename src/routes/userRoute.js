const { registrar, login, alterarUsuario, deletarUsuario } = require("../controllers/userController");

const router = require("express").Router();

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
    //#swagger.summary = 'Deleta o usuário por ID'
    deletarUsuario);

module.exports = router;