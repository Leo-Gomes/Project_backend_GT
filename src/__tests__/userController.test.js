const userController = require('../controllers/userController');
const prisma = require('../config/prisma');

describe('Controller - registrar usuário', () => {
  // Usuário mock para o teste
  const testUser = {
    firstname: 'Test',
    surname: 'User',
    email: `test${Date.now()}@example.com`, // email único a cada teste
    password: 'senhaSegura123',
  };

  // Cleanup depois do teste
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email
      }
    });
    await prisma.$disconnect();
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const req = {
      body: testUser
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.registrar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        firstname: testUser.firstname,
        surname: testUser.surname,
        email: testUser.email,
      })
    );

    // Verifica no banco de dados se o usuário foi realmente criado
    const dbUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });
    expect(dbUser).not.toBeNull();
    expect(dbUser.email).toBe(testUser.email);
  });
});