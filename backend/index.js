const express = require('express');
const cors = require('cors');
const pool = require('./database/db')

const app = express();

app.use(express.json());
app.use(cors());


const PORT = 3000

app.listen(PORT, ()=>{
    console.log("Servidor encendido " + PORT)
})

app.get('/posts', async (req, res) =>{
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows)
})

app.post('/posts', async (req, res) =>{
    const { titulo, img, descripcion, likes } = req.body
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)', values)
    res.send("Posts añadido")
})

app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    
    try {
        const query = {
            text: "UPDATE posts SET nombre = $1, email = $2 WHERE id = $3 RETURNING *", values: [nombre, email, id],
        };
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            return res.status(404).json({ mensaje: "Posts no encontrado" });
        }

        res.json({
            mensaje: "Posts actualizado",
            usuario: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el posts" });
    }
});

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING *", [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                mensaje: "Posts no encontrado"
            });
        }
        res.json({
            mensaje: "Posts eliminado",
            usuario: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el Posts"});
    }
});

