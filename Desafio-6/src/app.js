import express from "express"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import ProductManager from "./managers/productManager.js"

import {Server} from "socket.io"
import { Socket } from "engine.io"

const app = express()
const PORT = 8080;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))

app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

app.use("/api", productRouter)
app.use("/api", cartRouter)
app.use("/", viewRouter)



const httpServer = app.listen(PORT, () => {
    console.log("server is working in port 8080")
})

const socketServer = new Server(httpServer)

const pmanagersocket = new ProductManager(__dirname+"/files/products.json")



socketServer.on("connection", async (socket)=>{
    console.log("cliente conectado con id", socket.id)
    const listaProductos = await pmanagersocket.getProducts({})
    socketServer.emit("enviodeproducts", listaProductos)

    socket.on("addProduct", async(obj)=>{
        await  pmanagersocket.addProduct(obj)
        const listaProductos = await pmanagersocket.getProducts({})
        socketServer.emit("enviodeproducts", listaProductos)
    })

    socket.on("deleteProduct", async(id)=>{
        await  pmanagersocket.deleteProduct(id)
        const listaProductos = await pmanagersocket.getProducts({})
        socketServer.emit("enviodeproducts", listaProductos)
    })
})