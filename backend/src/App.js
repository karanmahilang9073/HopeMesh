import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import limiter from './middleware/rateLimiter.js';


export const app = express();

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res) => {
    res.send('HopeMesh')
})
