import { promises as fs } from 'fs'

class ProductManager {
    constructor() {
        this.patch = './productos.txt'
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, 'utf-8')
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log('Producto no encontrado')
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta4 = await this.readProducts()
        let productFilter = respuesta4.filter( products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Product borrado")
    }

    updateProducts = async ({id, ...producto}) =>{
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsNew = [
            {id, ...producto},
            ...productOld
        ] 
        await fs.writeFile(this.patch, JSON.stringify(productsNew))
    }
}

const productos = new ProductManager

// productos.addProduct("title-1", "description-1", 2000, "Image-1", 12)
// productos.addProduct("title-2", "description-2", 4000, "Image-2", 10)
// productos.addProduct("title-3", "description-3", 4000, "Image-3", 14)

// ** Test

// productos.getProducts()

// productos.getProductsById(2)

// productos.deleteProductsById(2)

// productos.updateProducts({
//     title: 'title-1',
//     description: 'description-1',
//     price: '8000',
//     imagen : 'Image-1',
//     stock: 12,
//     id: 1
// })

// **