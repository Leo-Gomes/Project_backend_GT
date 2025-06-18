##🚀 Projeto API REST com Node.js, Express e PostgreSQL (PgAdmin 4)

#🎯 O que vamos fazer?

Criar uma API, usando Node.js no backend e PostgreSQL como banco de dados que será gerenciado pelo PgAdmin 4 e usar o Prisma como nosso ORM.

#🧰 Tecnologias que vamos usar:

🟢 Node.js → Para rodar JavaScript no servidor.

🚏 Express.js → Criar as rotas da API.

🔐 Dotenv → Esconder senhas e configurações sensíveis.

🔄 Nodemon → Pra não precisar ficar reiniciando o servidor toda hora.

🐘 PostgreSQL + PgAdmin 4 → Onde ficam dados.

✨ Prisma → Para facilitar a comunicação com o banco de dados.

🛡️ JWT (JSON Web Token) → Para proteger as rotas com autenticação.

🧪 Jest → Para garantir que tudo está funcionando com testes.

#📂 Estrutura básica do projeto:



project-root/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   ├── repositories/
│   │   ├── categoryRepository.js
│   │   ├── productRepository.js
│   │   └── userRepository.js
│   ├── routes/
│   │   ├── categoryRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── services/
│   │   ├── categoryService.js
│   │   ├── productService.js
│   │   └── userService.js
│   ├── app.js
│   └── server.js
├── tests/
├── .env
├── .gitignore
├── package.json
├── README.md
├── swagger.js
└── swagger-output.js

#✅ Códigos de resposta da API (status HTTP):

Código Nome O que significa?

200 OK Tudo certo! Requisição bem-sucedida ✅ 201 Created Algo foi criado com sucesso 🎉 204 No Content Operação feita, mas sem nada pra devolver 🚫📦 400 Bad Request Algo de errado veio na sua requisição 🙈 401 Unauthorized Faltou autenticação! Faça login primeiro 🔒 404 Not Found O que você pediu não existe 😢

#🏃‍♂️ Como rodar o projeto:

Instale as dependências:

bash Copiar Editar npm install

Rode o servidor com Nodemon:

bash Copiar Editar npm run dev

#🐘 Configurando o PostgreSQL com Prisma

👉 Instalação do Prisma:

bash Copiar Editar npm install prisma --save-dev npm install @prisma/client

Depois:

bash Copiar Editar npx prisma init

👉 Exemplo de .env:

env Copiar Editar DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco" (Só trocar usuario, senha e nome_do_banco pelos seus dados reais)

👉 Exemplo de schema.prisma:

prisma Copiar Editar generator client { provider = "prisma-client-js" }

datasource db { provider = "postgresql" url = env("DATABASE_URL") }

model User { id Int @id @default(autoincrement()) name String email String @unique password String createdAt DateTime @default(now()) updatedAt DateTime @updatedAt }

👉 Rodando as migrações:

bash Copiar Editar npx prisma migrate dev --name init