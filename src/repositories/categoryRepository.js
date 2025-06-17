const prisma = require('../config/prisma')

async function buscarCategorias({ limit, page, fields, use_in_menu }) {
    const take = Number(limit) === -1 ? undefined : Number(limit);
    const skip = take ? (Number(page) - 1) * take : undefined;

    const where = use_in_menu !== undefined ? { use_in_menu: use_in_menu === 'true' } : {};
    const select = fields
        ? fields.split(',').reduce((acc, curr) => ({ ...acc, [curr]: true }), { id: true })
        : undefined;

    const [data, total] = await Promise.all([
        prisma.category.findMany({
            where,
            take,
            skip,
            select
        }),
        prisma.category.count({ where })
    ]);

    return { data, total };
}

function buscarCategoriaPorId(id) {
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
    buscarCategorias, buscarCategoriaPorId, inserirCategoriaRepository, alterarCategoriaRepository, deletarCategoriaRepository
}