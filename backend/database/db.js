const { Pool } = require('pg')

const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '663686',
    database: 'likeme',
    allowExitOnIdle: true
})

const getHealth = async () =>{
    try {
        const result = await pool.query("SELECT NOW()")
       
        console.log(result.rows[0].now)
    } catch (error) {
        console.error("Error conectando a la base de datos: "+ error.message)
    }
   
}

getHealth()

module.exports = pool