import express from 'express'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import 'dotenv/config'

import productsRouter from './routers/products.js'
import cartsRouter from './routers/carts.js'
import viewsRouter from './routers/views.js'
import __dirname from './utils.js'
import { dbConnection } from './database/config.js'
import { messageModel } from './models/messages.js'
import { addProductService, getProductsService } from './services/products.js'


const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

await dbConnection()

const expressServer = app.listen(PORT, () => {
    console.log('este es el app.listen!!');
})

const io = new Server(expressServer)

io.on('connection', async (socket) => {

    const { payload } = await getProductsService({})
    const productos = payload
    socket.emit('productos', payload)
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await addProductService({ ...producto })
        if (newProduct) {
            productos.push(newProduct)
            socket.emit('productos', productos)
        }
    })

    const messages = await messageModel.find()
    socket.emit('message', messages)

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({ ...data })
        if (newMessage) {
            const messages = await messageModel.find()
            io.emit('messageLogs', messages)
        }
    })

    socket.broadcast.emit('nuevo_user')
})