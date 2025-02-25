import express from "express"
import dotenv from "dotenv"
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js"
import { userRouter } from "./routes/userRouter.js"
import { connectDB } from "./lib/conectionDB.js"
import cors from "cors"
import checkToken from "./middlewares/checkToken.js"
import cookieParser from "cookie-parser"
import { messageRouter } from "./routes/messageRouter.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
const app = express()

dotenv.config()
connectDB()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
/// meanoing pof use() =>      this means for every request that is coming
app.use(express.json()) /// next()
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)


app.use(express.static(`${__dirname}/dist`))

/// reqests coming to /api/users
app.use("/api/users",userRouter)
app.use("/api/messages",checkToken,messageRouter)

app.get("*"),(req,res)=>{
    res.sendFile(`${__dirname}/dist/index.html`)
}



///// i create global error handler 

app.use(globalErrorHandler)


const PORT = process.env.PORT || 5469


app.listen(PORT,()=>{
    console.log(`[SERVER]  is runnnig on : http://localhost:${PORT}`)
})