import dotenv from 'dotenv'
import { connectDB } from './src/database/db.js'
import { app } from './src/App.js'


dotenv.config()

const PORT = process.env.PORT

async function startServer(){
    await connectDB()
    app.listen(PORT, () => {
        console.log(`HOPEMESH is running on PORT:${PORT}`)
    })
}
startServer()
