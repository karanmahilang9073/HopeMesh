import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express();
app.use(express.json())

const PORT = process.env.PORT

app.get('/', (req,res) => {
    res.send('HopeMesh')
})

app.listen(PORT, () => {
    console.log(`our backend is running on PORT:${PORT}`)
})