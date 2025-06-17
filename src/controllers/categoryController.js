const { listarCategoriasService, categoriaPorIdService, inserirCategoriaService, alterarCategoriaService, deletarCategoriaService } = require("../services/categoryService");

async function listarCategorias(req, res) {
    const { limit = 12, page = 1, fields, useInMenu } = req.query;

    try {
        const result = await listarCategoriasService({ limit, page, fields, useInMenu });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function categoriaPorId(req, res) {
    const {id} = req.params;
    try {
        const categoria = await categoriaPorIdService(Number(id));
        if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });

        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function inserirCategoria(req, res) {
    const { name, slug, useInMenu } = req.body;

    try {
        const novaCategoria = await inserirCategoriaService(name, slug, useInMenu);
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function alterarCategoria(req, res) {
    const { id } = req.params;
    const { name, slug, useInMenu } = req.body;

    try {
        const result = await alterarCategoriaService(Number(id), name, slug, useInMenu);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 400).json({ error: error.message });
    }
}

async function deletarCategoria(req, res) {
    const { id } = req.params;

    try {
        await deletarCategoriaService(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 400).json({ error: error.message });
    }
}



module.exports = {
    listarCategorias, categoriaPorId, inserirCategoria, alterarCategoria, deletarCategoria
}