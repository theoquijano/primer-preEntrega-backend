import { Router } from 'express'
import { getProductsByIdService, getProductsService } from '../services/products.js'
import { getCartByIdService } from '../services/carts.js'

const router = Router()

router.get('/', async (req, res) => {
    const { payload } = await getProductsService({})
    return res.render('home', { productos: payload, styles: 'styles.css' })
})

router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts')
})

router.get('/chat', (req, res) => {
    return res.render('chat')
})

router.get('/products', async (req, res) => {
    const result = await getProductsService({ ...req.query })
    return res.render('products', { title: 'productos', result })
})

router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params
    console.log('id del carrito ', cid);
    const carrito = await getCartByIdService(cid)
    return res.render('cart', { title: 'carrito', carrito })
})

export default router