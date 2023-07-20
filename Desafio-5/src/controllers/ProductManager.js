import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'


class ProductManager {
    constructor() {
        this.path = './src/models/products.json'
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf8')
        return JSON.parse(products)
    }

    writeProduts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(el => el.id === id)
    }
    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProduts(productAll)
        return "Producto Agregado"
    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if (!productById) return 'Producto no encontrado'
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if (!productById) return 'Producto no encontrado'
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProduts(products)
        return "Producto actualizado"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existProducts = products.some(el => el.id === id)
        if (existProducts) {
            let filterProducts = products.filter(el => el.id != id)
            await this.writeProduts(filterProducts)
            return "Producto eliminado"
        }
        return "Producto a eliminar no encontrado"
    }
}

export default ProductManager

