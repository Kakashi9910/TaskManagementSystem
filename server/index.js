import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes.js'
import { dbConnection } from './database/db.js'
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
const app = express()

const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: [process.env.CLIENT_URL], // Replace with your frontend origin(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Explicitly allow headers

}))
app.use(cookieParser())
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/auth',authRoutes)
app.use('/api/task',taskRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
    dbConnection()
})