import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"

const app=express()
const PORT=8080;
console.log(__dirname)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+"/public"))
app.use("/api",productRouter)
app.use("/api",cartRouter)



app.listen(PORT,()=>{
    console.log("server is working")
})