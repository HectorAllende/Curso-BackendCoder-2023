import { promises as fs } from 'fs'

export default class ProductManager {
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
        try {
            let respuesta = await fs.readFile(this.patch, 'utf-8')
            return JSON.parse(respuesta)

        } catch (error) {
            console.log(error)
        }
    }

    getProduct = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log('Producto no encontrado')
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductById = async (id) => {
        let respuesta4 = await this.readProducts()
        let productFilter = respuesta4.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Product borrado")
    }

    updateProduct = async ({ id, ...producto }) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsNew = [
            { id, ...producto },
            ...productOld
        ]
        await fs.writeFile(this.patch, JSON.stringify(productsNew))
    }
}

// const productos = new ProductManager

// productos.addProduct("title-1", "description-1", 2000, "Image-1", 12)
// productos.addProduct("title-2", "description-2", 4000, "Image-2", 10)
// productos.addProduct("title-3", "description-3", 5000, "Image-3", 14)
// productos.addProduct("title-4", "description-4", 6000, "Image-4", 140)
// productos.addProduct("title-5", "description-5", 7000, "Image-5", 15)
// productos.addProduct("title-6", "description-6", 8000, "Image-6", 12)
// productos.addProduct("title-7", "description-7", 9000, "Image-7", 112)
// productos.addProduct("title-8", "description-8", 10000, "Image-8", 123)
// productos.addProduct("title-9", "description-9", 1100, "Image-9", 123)
// productos.addProduct("title-10", "description-10", 8000, "Image-10", 13)
