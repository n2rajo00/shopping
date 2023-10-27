const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const port = 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", async (req, res) => {
    const connection = await mysql.createConnection(config.db)
        const [result, ] = await connection.execute('select * from `item`')
    res.status(200).json(result)
})

app.post("/new",async (req,res) => {
    try {
        const connection = await mysql.createConnection(config.db)
        const [result, ] = await connection.execute('insert into `item` (description) values (?) ',[req.body.description])
        if (!result) result = []
        res.status(200).json({id:result.insertId})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.listen(port)

