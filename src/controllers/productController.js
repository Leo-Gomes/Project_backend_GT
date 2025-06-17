const { listarProdutosService, produtoPorIdService, inserirProdutoService, alterarProdutoService, deletarProdutoService } = require("../services/productService");

async function listarProdutos (req, res) {
    try {
        const produtos = await listarProdutosService(req.query);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function produtoPorId(req, res) {
    try {
        const produto = await produtoPorIdService(req.params.id);
        if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function inserirProduto(req, res) {
    try {
      const produto = await inserirProdutoService(req.body);
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

async function alterarProduto(req, res) {
    try {
      await alterarProdutoService(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  };

async function deletarProduto(req, res) {
    try {
      await deletarProdutoService(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  };

  module.exports = {
    listarProdutos, produtoPorId, inserirProduto, alterarProduto, deletarProduto
  }