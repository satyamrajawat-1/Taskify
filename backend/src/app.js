import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.routes.js'
import errorHandler from './middlewares/errorHandler.js'
const app = express()

app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))


app.use(express.urlencoded({
    limit:"16kb",
}))



app.use(express.static("public"))

app.use('/api/v1/user',userRouter)
app.use('/api/v1/todo',todoRouter)

app.use(errorHandler)
export {app}


