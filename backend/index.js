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


