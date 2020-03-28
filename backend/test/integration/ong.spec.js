const request = require('supertest');
const app = require('../../src/app');
const connection = require("../../src/database/connection");
describe("ONG", () => {
  beforeEach( async () => {
    await connection.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app).post('/ongs').send({
      name: "ONG NAMEss",
      email: "email@test.com",
      whatsapp: "85997507271",
      city: "Fortaleza",
      uf: "CE"
    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
});