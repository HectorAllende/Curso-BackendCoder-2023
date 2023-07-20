import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = './src/models/carts.json'
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf8')
        return JSON.parse(carts)
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(el => el.id === id)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return 'Carrito Agregado'
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return 'Carrito no encontrado'
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if (!cartById) return 'Carrito no encontrado'
        let productById = await productAll.exist(productId)
        if (!productById) return "Producto no encontrado"
        
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(el => el.id != cartId)

        if (cartById.products.some(el => el.id === productId)) {
            let moreProductInCart = cartById.products.find(el => el.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [ cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado agregado al carrito"
        }
        
        cartById.products.push({ id: productById.id, cantidad: 1 })

        let cartsConcat = [ cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito"
    }
}

export default CartManager