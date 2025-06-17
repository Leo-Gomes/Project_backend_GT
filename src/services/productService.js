const { produtoPorIdRepository, inserirProdutoRepository, alterarProdutoRepository, deletarProdutoRepository } = require("../repositories/productRepository");

async function listarProdutosService(query) {
    return await listarProdutosRepository(query);
  };

  async function produtoPorIdService(id) {
    return await produtoPorIdRepository(Number(id));
};

  async function inserirProdutoService(data) {
    return await inserirProdutoRepository(data);
};

  async function alterarProdutoService(id, data) {
    const result = await alterarProdutoRepository(Number(id), data);
    if (!result) {
      const error = new Error("Produto não encontrado");
      error.status = 404;
      throw error;
    }
    return result;
};

async function deletarProdutoService(id) {
    await deletarProdutoRepository(Number(id));
    if (!result) {
      const error = new Error("Produto não encontrado");
      error.status = 404;
      throw error;
    }
   
};

module.exports = {
    listarProdutosService, produtoPorIdService, inserirProdutoService, alterarProdutoService, deletarProdutoService
}