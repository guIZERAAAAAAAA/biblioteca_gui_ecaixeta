import express from "express";
const app = express();
app.use(express.json());

// app.js (trecho)
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const livros = [
    {
        id : 1,
        titulo: "O escaravelho do diabo",
        autor: "Lucia Machado",
        disponivel: true
    },
    {
        id : 2,
        titulo: "E o vento levou",
        autor: "Erico veríssimo",
        disponivel: false
    }
]


app.get('/livros', (req, res) =>{
    const titulo = req.query?.titulo || null
    let livrosFiltrados = null
    if(titulo !== null){
      livrosFiltrados = livros.filter(item => item.titulo.toLowerCase()
                                                    .includes(titulo.toLowerCase()));
    }

    livrosFiltrados = livrosFiltrados ?? livros;
    res.status(200).json(livrosFiltrados);
});

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
app.get('/livros/:id', (req, res) =>{
    const id = Number(req.params?.id);

    const livro = livros.find(item => item.id === id);

    if(!livro){
        return res.status(404).json({error: "livro não encontrado"})
    }

    res.status(200).json(livro);

});


app.post('/livros', (req, res)=>{

    const titulo = req.body?.titulo || null;
    const autor = req.body?.autor || null;

      if(!autor){
        return res.status(400).json({error: "Autor é obrigatório"})
      }

      if(!titulo){
        return res.status(400).json({error: "Título é obrigatório"})
      }

        const novoLivro = {
            id: livros.length + 1,
            titulo : titulo,
            autor : autor,
            disponviel: req.body?.disponivel || false
        }

        livros.push(novoLivro);

        res.status(201).json(novoLivro);

});

app.put('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const livro = livros.find(item => item.id === id);
    if(!livro){
        return res.status(404).json({error: "Livro não encontrado"})
    }

    if(req?.body?.titulo && req.body.titulo !== ""){
        livro.titulo = req.body.titulo;
    }

    if(req?.body?.autor && req.body.autor !== ""){
        livro.autor = req.body.autor;
    }

    if(req?.body?.disponivel && req.body.disponivel !== ""){
        livro.disponivel = req.body.disponivel;
    }

    res.status(200).json(livro)
});

app.delete('/livros/:id', (req, res) =>{
    const id = Number(req.params.id);
    const indice = livros.findIndex(item => item.id === id)

    if(indice === -1){
        return res.status(404).json({ error: "Livro não encontrado" })
    }

    livros.splice(indice, 1);

    res.status(204).send('')

});

export default app;