// express
import express from "express"
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"

const app=express()
const PORT=process.env.PORT||8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +"/public"))

app.engine("handlbars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")

// Rutas
app.use("/api",productRouter)
app.use("/api",cartRouter)
app.use("/",viewRouter)


const httpServer=app.listen(PORT,()=>{
    console.log("server is working")
})

const socketServer= new Server(httpServer)