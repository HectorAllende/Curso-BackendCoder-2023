import mongoose from "mongoose"

const URI="mongodb+srv://hectorallende:252xKfuzQRuCQroE@cluster0.n3oxcxh.mongodb.net/ecommerce?retryWrites=true&w=majority"


await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})
console.log("Base de datos conectada....")


