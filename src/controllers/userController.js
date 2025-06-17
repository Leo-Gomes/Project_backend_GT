const {registrarUsuario, loginUsuario, alterarUsuarioService, deletarUsuarioService} = require('../services/userService')

async function registrar(req, res) {
    const {firstname, surname, email, password} = req.body
    try {
        const user = await registrarUsuario(firstname, surname, email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log()
    }
}

async function login(req, res) {
    const {email, password} = req.body
    try {
        const result = await loginUsuario(email, password);
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const alterarUsuario = async (req, res) => {

    const { id } = req.params;
    const { firstname, surname, email } = req.body;

    try {
        const result = await alterarUsuarioService(id, firstname, surname, email)

        res.status(200).json(result);
    } catch (error) {
        console.log("Erro ao alterar usuário", error);
        res.status(error.status || 500).json(
            {
                error: error.message,
                details: error.details || null
            });
    }
}

const deletarUsuario = async (req, res) => {

    const { id } = req.params;
    try {
        const result = await deletarUsuarioService(id)
        res.status(200).json({ message: 'Usuário deletado com sucesso', result: result })
    } catch (error) {
        console.log("Erro ao deletar Usuário", error);
        res.status(error.status || 500).json(
            {
                error: error.message,
                details: error.details || null
            });
    }
}

module.exports = {
    registrar, login, alterarUsuario, deletarUsuario
    
}