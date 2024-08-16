import express from 'express'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'

import productsRouter from './routers/products.js'
import cartsRouter from './routers/carts.js'
import viewsRouter from './routers/views.js'
import __dirname from './utils.js'
import ProductManager from './productManager.js'


const app = express();
const PORT = 8080

const p = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const expressServer = app.listen(PORT, () => {
    console.log('este es el app.listen!!');
})

const socketServer = new Server(expressServer)

socketServer.on('connection', socket => {

    const productos = p.getProducts()
    socket.emit('productos', productos)

    socket.on('agregarProducto', producto => {
        const result = p.addProduct({ ...producto })
        if (result.producto)
            socket.emit('productos', result.producto)
    })
})