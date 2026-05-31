import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan';
import { logger } from './Utils/logger.js';
import authRoute from './Routes/Auth_Route.js'
import profileRoute from './Routes/Profile_Route.js'
import workoutRoute from './Routes/Workout_Route.js'
import exerciseRoute from './Routes/Exercise_Route.js'
import subscriptionRoute from './Routes/Subscription_Route.js'
import { initCronJobs } from './Utils/cron.js';


const app = express()

initCronJobs()

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined', {
    stream: {write: (message) => logger.info(message.trim())}
}))

app.get('/health', (req, res) => {
    res.status(200).send('ok')
})

app.use("/auth", authRoute)
app.use("/user", profileRoute)
app.use("/workout", workoutRoute)
app.use("/workout", exerciseRoute)
app.use("/subscription", subscriptionRoute)

export default app