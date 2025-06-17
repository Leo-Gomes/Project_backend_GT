const express = require('express')
const userRouter = require('./routes/userRoute.js')
const categoryRouter = require('./routes/categoryRouter.js')
const productRouter = require('./routes/productRouter.js')

const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger-output.json');
const cors = require('cors')

app.use(cors({
  origin: '*'
}))

app.use(express.json());
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {

  // #swagger.tags = ['documentacao']

  // #swagger.summary = 'Redireciona para documentação API'
  res.redirect('./docs')
})

app.use('/v1/product', 
  // #swagger.tags = ['carrinho']
  productRouter);
app.use('/v1/category', 
  // #swagger.tags = ['carrinho-item']
  categoryRouter);
app.use('/v1/user', 
  // #swagger.tags = ['usuario']
  userRouter);

module.exports =  app;