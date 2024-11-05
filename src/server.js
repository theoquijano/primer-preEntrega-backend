import express from 'express'
import 'dotenv/config'

import __dirname from './utils.js'
import { dbConnection } from './database/config.js'
import { productsRouter, cartsRouter, authRouter } from './routers/index.js'


const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

await dbConnection()

app.listen(PORT, () => {
    console.log('este es el app.listen!!');
})

// const io = new Server(expressServer)

// io.on('connection', async (socket) => {

//     const limit = 50
//     const { payload } = await ProductsRepository.getProducts({ limit })
//     const productos = payload
//     socket.emit('productos', payload)
//     socket.on('agregarProducto', async (producto) => {
//         const newProduct = await ProductsRepository.addProduct({ ...producto })
//         if (newProduct) {
//             productos.push(newProduct)
//             socket.emit('productos', productos)
//         }
//     })

//     const messages = await messageModel.find()
//     socket.emit('message', messages)

//     socket.on('message', async (data) => {
//         const newMessage = await messageModel.create({ ...data })
//         if (newMessage) {
//             const messages = await messageModel.find()
//             io.emit('messageLogs', messages)
//         }
//     })

//     socket.broadcast.emit('nuevo_user')
// })