const prisma = require("../config/prisma");

const listarProdutosRepository = async (page, limit) => {
   
     return  await prisma.product.findMany({
     
      skip: (page - 1) * limit,
      take: limit,
        include: {
          images: true,
          options: true,
          categories: true,
        },
      })

  
  };
  
  const produtoPorIdRepository = async (id) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        options: true,
        categories: true,
      },
    });
  };
  
  const inserirProdutoRepository = async (data) => {
    const { category_ids, images, options, ...productData } = data;

    return await prisma.product.create({
      data: {
        ...productData,
        categories: {
          create: category_ids.map((id) => ({
            category: { connect: { id } }
          })),
        },
        images: {
            create: images.map((img) => ({
              path: img.path,
              enabled: img.enabled ?? false
            })),
          },
        options: {
          create: options.map((opt) => ({
            title: opt.title,
            shape: opt.shape,
            radius: opt.radius ?? 0,
            type: opt.type,
            values: JSON.stringify(opt.value), // transforma array em string
          })),
        },
      },
      include: {
        images: true,
        options: true,
        categories: true,
      },
    });
  };
  
  const alterarProdutoRepository = async (id, data) => {
    const {
      category_ids = [],
      images = [],
      options = [],
      ...productData
    } = data;
  
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return null;
  
    // Atualiza os dados principais do produto (sem o id!)
    const result = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
      
      },
    });
  
    // Atualiza categorias (relação N:N)
    await prisma.productCategory.deleteMany({ where: { productId: id } });
    if (category_ids.length > 0) {
      await prisma.productCategory.createMany({
        data: category_ids.map((categoryId) => ({
          productId: id,
          categoryId: categoryId,
        })),
      });
    }
  
    // Atualiza imagens
    await prisma.productImage.deleteMany({ where: { productId: id } });
    if (images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((img) => ({
          productId: id,
          path: img.path,
          enabled: img.enabled ?? false,
        })),
      });
    }
  
    // Atualiza opções
    await prisma.productOption.deleteMany({ where: { productId: id } });
    if (options.length > 0) {
      await prisma.productOption.createMany({
        data: options.map((opt) => ({
          productId: id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius ?? 0,
          type: opt.type,
          values: JSON.stringify(opt.value),
        })),
      });
    }
  
    return result;
  };
  
  const deletarProdutoRepository = async (id) => {
    try {
      const product = await prisma.product.delete({ where: { id } });
      return product;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  };
  
  module.exports = {
    listarProdutosRepository,
    produtoPorIdRepository,
    inserirProdutoRepository,
    alterarProdutoRepository,
    deletarProdutoRepository,
  };