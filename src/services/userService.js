const {criarUsuario, encontrarUsuario, alterarUsuarioRepository, deletarUsuarioRepository} = require('../repositories/userRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.JWT_SECRET;

async function registrarUsuario(firstname, surname, email, password) {
    const usuarioExiste = await encontrarUsuario(email)
    if(usuarioExiste){
        throw new Error('Email já cadastrado')
    }
    
    const senhaCriptografada = await bcrypt.hash(password, 10);
    console.log(senhaCriptografada)
    const user = await criarUsuario({firstname, surname, email, password: senhaCriptografada})
    return {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email
    }
}

async function loginUsuario( email, password) {
    const user = await encontrarUsuario(email)

    if(!user){
        throw new Error('Usuário não encontrado')
    }

    const senhaValida = await bcrypt.compare(password, user.password)
    if(!senhaValida){
        throw new Error('Senha inválida')
    }

    const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1h'})
    return {token, 
            user: {
                id: user.id, firstname: user.firstname, surname: user.surname, email: user.email
            }}
}

async function alterarUsuarioService(id, firstname, surname, email) {
    
    
    const result = await alterarUsuarioRepository(id, firstname, surname, email)
    
        if(!result){
            const error = new Error("Usuário não encontrado para alterar")
            error.status = 404;
            throw error;
        }

        return result;
}

async function deletarUsuarioService(id) {
    const result = await deletarUsuarioRepository(id)

    return result;
}

module.exports = {
    registrarUsuario, loginUsuario, alterarUsuarioService, deletarUsuarioService
}