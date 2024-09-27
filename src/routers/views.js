import { Router } from 'express'
import {
    cartIdView,
    chatView,
    homeView,
    loginGet,
    LoginPost,
    logout,
    productsView,
    realTimeProductsView,
    registerGet,
    registerPost
} from '../controllers/views.js'
import { admin, auth } from '../middleware/auth.js'

const router = Router()

router.get('/', homeView)
router.get('/realtimeproducts', [auth, admin], realTimeProductsView)
router.get('/chat', auth, chatView)
router.get('/products', auth, productsView)
router.get('/cart/:cid', auth, cartIdView)

router.get('/login', loginGet)
router.post('/login', LoginPost)

router.get('/register', registerGet)
router.post('/register', registerPost)

router.get('/logout', logout)

export default router