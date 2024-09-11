// import fs from 'fs';
// import path from 'path';

// class ProductManager {
//     #products;
//     #path;

//     constructor() {
//         this.#path = path.resolve('src', 'data', 'productos.json')
//         this.#products = this.#leerProductosInFile();
//     }

//     #asignarIdProducto() {
//         let id = 1;
//         if (this.#products.length !== 0)
//             id = this.#products[this.#products.length - 1].id + 1;
//         return id
//     }

//     #leerProductosInFile() {
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
//             fs.writeFileSync(this.#path, JSON.stringify(this.#products))
//         } catch (error) {
//             console.log(`${error} al momento de guardar.`);
//         }
//     }

//     addProduct({ title, description, price, thumbnails = [], code, stock, category, status = true }) {

//         let result = 'Ocurrio un error'

//         if (!title || !description || !price || !code || !stock || !category)
//             result = 'Todos los parametros son requeridos [title, description, price, code, stock, category]'
//         else {
//             const codigoRepetido = this.#products.some(p => p.code == code);
//             if (codigoRepetido)
//                 result = `El codigo ${code} ya se encuentra registrado en otro producto`
//             else {
//                 const id = this.#asignarIdProducto()

//                 const nuevoProducto = {
//                     id,
//                     title,
//                     description,
//                     price,
//                     thumbnails,
//                     code,
//                     stock,
//                     category,
//                     status
//                 }
//                 this.#products.push(nuevoProducto)
//                 this.#guardarArchivo()
//                 result = {
//                     msg: 'Producto agregado exitosamente!',
//                     producto: nuevoProducto
//                 }
//             }
//         }
//         return result
//     }

//     getProducts(limit = 0) {
//         limit = Number(limit)
//         if (limit > 0)
//             return this.#products.slice(0, limit)
//         return this.#products
//     }

//     getProductById(id) {
//         let status = false
//         let resp = `El producto con id ${id} no existe!!!!`

//         const producto = this.#products.find(p => p.id == id)
//         if (producto) {
//             status = true
//             resp = producto
//         }

//         return { status, resp }
//     }

//     updateProduct(id, objetUpdate) {
//         let result = `El producto con id ${id} no existe`

//         const index = this.#products.findIndex(p => p.id === id)

//         if (index !== -1) {
//             const { id, ...rest } = objetUpdate
//             const propiedadesPermitidas = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status']
//             const propiedadesActualizadas = Object.keys(rest)
//                 .filter(propiedad => propiedadesPermitidas.includes(propiedad))
//                 .reduce((obj, key) => {
//                     obj[key] = rest[key]
//                     return obj
//                 }, {})
//             this.#products[index] = { ...this.#products[index], ...propiedadesActualizadas }
//             this.#guardarArchivo()
//             result = {
//                 msg: 'Producto actualizado!',
//                 producto: this.#products[index]
//             }
//         }

//         return result
//     }

//     deleteProduct(id) {
//         let msg = `El producto ${id} no existe`

//         const index = this.#products.findIndex(p => p.id === id)
//         if (index !== -1) {
//             this.#products = this.#products.filter(p => p.id !== id)
//             this.#guardarArchivo()
//             msg = 'Producto eliminado!'
//         }
//         return msg
//     }
// }

// export default ProductManager