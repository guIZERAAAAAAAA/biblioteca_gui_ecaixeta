// livros.test.js
import request from "supertest";
import app from "../app.js";

test("POST /livros cria um novo livro", async () => {
  const resposta = await request(app).post("/livros")
    .send({ titulo: "Drácula", autor: " Bram Stoker" });

  expect(resposta.status).toBe(201);
  expect(resposta.body.titulo).toBe("Drácula");
});

test("POST /livros retorna erro ao não informar o autor", async () => {
  const resposta = await request(app).post("/livros")
    .send({ titulo: "Drácula"});

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Autor é obrigatório");
});


test("GET /livros  filtra livros pelo título", async () => {
  const resposta = await request(app).get("/livros")
    .send("titulo=escaravelho");

  expect(resposta.status).toBe(200);
  expect(resposta.body[0].titulo).toBe("O escaravelho do diabo");
});

test("GET /livros dois livros já cadastrados", async () => {
  const resposta = await request(app).get("/livros")
    .send();

  expect(resposta.status).toBe(200);
  expect(resposta.body.length).toBe(3);
});