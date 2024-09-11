// import fs from 'fs';
// import path from 'path';
// import ProductManager from './productManager.js';

// class CartsManager {
//     #carts;
//     #path;

//     constructor() {
//         this.#path = path.resolve('src', 'data', 'carritos.json')
//         this.#carts = this.#leerCarritosInFile();
//     }

//     #asignarIdCart() {
//         let id = 1;
//         if (this.#carts.length !== 0)
//             id = this.#carts[this.#carts.length - 1].id + 1;
//         return id
//     }

//     #leerCarritosInFile() {
//         try {
//             if (fs.existsSync(this.#path)) {
//                 const data = fs.readFileSync(this.#path, 'utf-8');
//                 const productos = JSON.parse(data);
//                 return productos;
//             }
//             return [];
//         } catch (error) {
//             console.log(`${error} !!!`);
//             return [];
//         }
//     }

//     #guardarArchivo() {
//         try {
//             fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
//         } catch (error) {
//             console.log(`${error} al momento de guardar.`);
//         }
//     }

//     createCart() {
//         const newCart = {
//             id: this.#asignarIdCart(),
//             products: []
//         }

//         this.#carts.push(newCart)
//         this.#guardarArchivo()

//         return newCart
//     }

//     getCartById(id) {
//         const producto = this.#carts.find(p => p.id == id)
//         if (producto)
//             return producto
//         else
//             return `Not Found con id: ${id}`
//     }

//     addProductInCart(cid, pid) {
//         let respuesta = `El carrito con id ${cid} no existe`
//         const indexCarrito = this.#carts.findIndex(c => c.id === cid)

//         if (indexCarrito !== -1) {
//             const indexProductoInCart = this.#carts[indexCarrito].products.findIndex(p => p.id === pid)
//             const p = new ProductManager()
//             const producto = p.getProductById(pid)

//             if (producto.status && indexProductoInCart === -1) {
//                 this.#carts[indexCarrito].products.push({ id: pid, 'quantity': 1 })
//                 this.#guardarArchivo()
//                 respuesta = 'producto agregado al carrito'
//             } else if (producto.status && indexProductoInCart !== -1) {
//                 ++this.#carts[indexCarrito].products[indexProductoInCart].quantity
//                 this.#guardarArchivo()
//                 respuesta = 'producto agregado al carrito'
//             } else {
//                 respuesta = `El producto con ${pid} no existe!`
//             }
//         }

//         return respuesta
//     }
// }

// export default CartsManager