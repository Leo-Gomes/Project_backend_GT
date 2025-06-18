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
  
    await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        categories: {
          deleteMany: {},
          create: category_ids.map((catId) => ({ category_id: catId })),
        },
      },
    });
  
    for (const image of images) {
      if (image.deleted) {
        await prisma.productImage.delete({ where: { id: image.id } });
      } else if (image.id) {
        await prisma.productImage.update({
          where: { id: image.id },
          data: { content: image.content },
        });
      } else {
        await prisma.productImage.create({
          data: { content: image.content, type: image.type, product_id: id },
        });
      }
    }
  
    for (const opt of options) {
      if (opt.deleted) {
        await prisma.productOption.delete({ where: { id: opt.id } });
      } else if (opt.id) {
        await prisma.productOption.update({
          where: { id: opt.id },
          data: {
            ...opt,
            value: opt.value || opt.values,
          },
        });
      } else {
        await prisma.productOption.create({
          data: {
            ...opt,
            value: opt.value || opt.values,
            product_id: id,
          },
        });
      }
    }
  
    return true;
  };
  
  const deletarProdutoRepository = async (id) => {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
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