import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'


class ProductManager {
    constructor(){
        this.path ='./src/models/products.json'
    }

    readProducts = async () =>{
        let products = await fs.readFile(this.path, 'utf8')
        return JSON.parse(products)
    }

    writeProduts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProduts(productAll)
        return "Producto Agregado"
    }

    getProducts = async () =>{
        return await this.readProducts()
    }
}

export default ProductManager

