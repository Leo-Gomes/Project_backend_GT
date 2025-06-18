const prisma = require('../config/prisma')

async function listarCategorias(page, limit) {
        return prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {useInMenu: true}
        })

}

function categoriaPorId(id) {
    return prisma.category.findUnique({
        where: { id }
    });
}

function inserirCategoriaRepository(data) {
    return prisma.category.create({ data });
}

async function alterarCategoriaRepository(id, data) {
    try {
        return await prisma.category.update({
            where: { id },
            data
        });
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

async function deletarCategoriaRepository(id) {
    try {
        const categoria = await prisma.category.delete({
            where: { id }
        });
        return categoria;
    } catch (error) {
        if (error.code === 'P2025') return false;
        throw error;
    }
}

module.exports = {
    listarCategorias, categoriaPorId, inserirCategoriaRepository, alterarCategoriaRepository, deletarCategoriaRepository
}