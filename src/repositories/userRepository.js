const prisma = require('../config/prisma.js')

function usuarioPorIdRepository(id) {
    return prisma.user.findUnique({
        where: { id },
        select: {
            firstname: true,
            surname: true,
            email: true
        },
    });
}

function criarUsuario(data) {

    return prisma.user.create({ data })
}

function encontrarUsuario(email) {
    return prisma.user.findUnique({
        where: { email }
    })
}

async function alterarUsuarioRepository(id, firstname, surname, email) {
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { firstname, surname, email },
            select: {
                firstname: true,
                surname: true,
                email: true
            },
        })
        return user
    } catch (error) {
        if (error.code === 'p2025') {
            return null
        }
        throw error;
    }

}

async function deletarUsuarioRepository(id) {
    try {
        const user = await prisma.user.delete({
            where: {id: Number(id)},
            select: {
                firstname: true,
                surname: true,
                email: true
            },
        })
    return user
   } catch (error) {
        if(error.code === 'p2025'){
            return null
        }
        throw error;
   }
   
}

module.exports = {
    criarUsuario, encontrarUsuario, alterarUsuarioRepository, deletarUsuarioRepository, usuarioPorIdRepository
}