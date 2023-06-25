class ProductManager {
    static id = 0
    constructor() {
        this.products = []
    }

    addProducts(title, description, price, image, codigo, stock) {
        for (let index = 0; index < this.products.length; index++) {
            if (this.products[index].codigo === codigo) {
                console.log(`El codigo ${codigo}  esta repetido`);
                break
            }
        }
        const newProduct = {
            title, description, price, image, codigo, stock
        }
        // console.log(Object.values(newProduct))

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
            this.products.push({ 
                ...newProduct,
                id : ProductManager.id
            })
        }else{
            console.log("Todos los campos son obligatorios")
        }
    }
    getProducts() {
        return this.products
    }
    existe(id) {
        return this.products.find((producto) => producto.id === id)
    }
    getProductById(id) {
        !this.existe(id) ? console.log("Not Found") : console.log(this.existe(id))
    }
}

const productos = new ProductManager

// Llamada al arreglo vacio
console.log(productos.getProducts())

// Agrego productos
productos.addProducts('Libros', 'Descripcion-1', 500, 'Imagen-1', 'abc123', 10)
productos.addProducts('Juguetes', 'Descripcion-2', 500, 'Imagen-2', 'abc124', 30)

// Vuelvo a llamar a getProducts
console.log(productos.getProducts())

// Valido codigo repetido
productos.addProducts('Autos', 'Descripcion-3', 100, 'Imagen-3', 'abc124', 10)

// Busqueda por ID
productos.getProductById(4)
