const { buscarCategorias, buscarCategoriaPorId, inserirCategoriaRepository, alterarCategoriaRepository, deletarCategoriaRepository } = require("../repositories/categoryRepository");

async function listarCategoriasService({ limit, page, fields, use_in_menu }) {
    const categorias = await buscarCategorias({ limit, page, fields, use_in_menu });
    const total = categorias.total;
    const data = categorias.data;

    return {
        data,
        total,
        limit: Number(limit),
        page: Number(page)
    };
}

function categoriaPorIdService(id) {
    return buscarCategoriaPorId(id);
}

function inserirCategoriaService(name, slug, useInMenu = false) {
    return inserirCategoriaRepository({ name, slug, useInMenu });
}

async function alterarCategoriaService(id, name, slug, useInMenu = false) {
    const categoria = await alterarCategoriaRepository(id, { name, slug, useInMenu });
    if (!categoria) {
        const error = new Error("Categoria não encontrada");
        error.status = 404;
        throw error;
    }
    return categoria;
}

async function deletarCategoriaService(id) {
    const deletada = await deletarCategoriaRepository(id);
    if (!deletada) {
        const error = new Error("Categoria não encontrada");
        error.status = 404;
        throw error;
    }
}

module.exports = {
    listarCategoriasService, categoriaPorIdService, inserirCategoriaService, alterarCategoriaService, deletarCategoriaService
}