# Biblioteca API


API REST para gerenciamento de livros, desenvolvida com Node.js e Express.

## Tecnologias

- Node.js
- Express
- Jest
- SuperTest
- Swagger UI

## Instalação

```bash
npm install
```

## Execução

Modo de desenvolvimento, com reinicialização automática:

```bash
npm run dev
```

Modo de produção:

```bash
npm run prod
```

O servidor será iniciado em `http://localhost:3000`.

## Documentação da API

A documentação interativa do Swagger está disponível em:

```text
http://localhost:3000/docs
```

## Testes

Execute a suíte de testes com relatório de cobertura:

```bash
npm test
```

Os testes automatizados cobrem os endpoints de livros e validam 100% de statements,
branches, funções e linhas da aplicação.

## Endpoints

### Listar livros

```http
GET /livros
```

É possível filtrar os livros pelo título:

```http
GET /livros?titulo=escaravelho
```

### Buscar livro por ID

```http
GET /livros/:id
```

Exemplo:

```http
GET /livros/1
```

### Criar livro

```http
POST /livros
Content-Type: application/json
```

Exemplo de corpo:

```json
{
	"titulo": "Dom Casmurro",
	"autor": "Machado de Assis",
	"disponivel": true
}
```

Os campos `titulo` e `autor` são obrigatórios. O campo `disponivel` é opcional.

### Atualizar livro

```http
PUT /livros/:id
Content-Type: application/json
```

Exemplo de corpo:

```json
{
	"titulo": "Dom Casmurro - Edição especial",
	"autor": "Machado de Assis",
	"disponivel": false
}
```

### Excluir livro

```http
DELETE /livros/:id
```

Em caso de sucesso, o endpoint retorna o status `204`.

## Modelo de livro

```json
{
	"id": 1,
	"titulo": "O escaravelho do diabo",
	"autor": "Lucia Machado",
	"disponivel": true
}
```

## Observações

Os dados são armazenados apenas em memória. Ao reiniciar o servidor, livros criados,
alterados ou excluídos não são persistidos.
