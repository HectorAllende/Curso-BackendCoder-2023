import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'


class CartManager {
    constructor(){
        this.path = './src/models/carts.json'
    }

    readProducts = async () => {
        let carts = await fs.readFile(this.path, 'utf8')
        return JSON.parse(carts)
    }

    writeProduts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCarts = async () =>{
        let cartsOld = await this.readProducts()
        let id = nanoid()
        let cartsConcat = [{id: id, products : []}]
    }
}

export default CartManager