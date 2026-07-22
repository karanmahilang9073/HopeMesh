import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import limiter from './middleware/rateLimiter.js';
import router from './routes/index.js';
import { errorMiddleware } from './middleware/error.middleware.js';


export const app = express();

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1', router)

app.use(errorMiddleware)

app.get('/health', (req,res) => {
    res.json({success: true, message: 'HopeMesh: connect the donors to required places'})
})

app.get('/', (req, res) => {
    res.send('HopeMesh backend working fine')
})