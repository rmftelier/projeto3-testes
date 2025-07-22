import request from "supertest";

import app from "../../src/infra/server/server";

describe("POST / users", () => {
  it("deve criar um novo usuário com sucesso", async () => {
    const response = await request(app).post("/users").send({
      name: "Dandara da Silva",
      login: "dandara1995",
      email: "dandara@example.com",
      password: "123456",
    });

    expect(response.status).toBe(201)
  });

  it('deve retornar erro em caso de email duplicado', async () => {
        await request(app).post("/users").send({
      name: "Dandara da Silva",
      login: "dandara1995",
      email: "dandara@example.com",
      password: "123456",

    });
    const response = await request(app).post("/users").send({
      name: "Bianca Santana",
      login: "Bianca1995",
      email: "dandara@example.com",
      password: "1xjsjs",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Usuário já existe com esse e-mail')

  })
})