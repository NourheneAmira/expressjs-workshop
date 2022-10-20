import express from 'express'
import'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import Morgan from 'morgan'
// import Mongoose from'mongoose'
/////////////////////////////////////////////////////////////
import databaseConnexion from './setup/db';
import todoRouter from './routes/todo.js'
import userRouter from './routes/user'
import course from './routes/course'
import sessions from './routes/sessions'
import calendarRoute from "./routes/calendar";

const app = express()
const port = process.env.PORT || 3000

//connect to the database
databaseConnexion()

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false, 
})

//enable middleware
app.use(cors(
  {
    //url to the frontend
    origin: 'http://localhost:3000',
    credentials: true
  }
))

app.use(helmet())
app.use(limiter)
app.use(Morgan('tiny'))
app.use(express.json())

// route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//import routes
app.use('/api/todos',todoRouter)
app.use('/api/',userRouter)
app.use('/api/courses',course)
app.use("/api/calendar",calendarRoute);
app.use("/api/sessions",sessions);

//start the app
app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})