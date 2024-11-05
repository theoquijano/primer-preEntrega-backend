import { Router } from 'express'
import { check } from 'express-validator'
import { addProductInCart, deleteProductsInCart, getCartById, updateProductsInCart } from '../controllers/carts.js'
import { validarCampos, validarJWT } from '../middleware/auth.js'
import { ticketModel } from '../dao/mongo/models/ticketModel.js'
import { cartModel } from '../dao/mongo/models/cartsModel.js'
import { userModel } from '../dao/mongo/models/usersModel.js'
import { productModel } from '../dao/mongo/models/productsModel.js'
import { calcularTotal, generateUniqueCode } from '../utils/cartUtils.js'

const router = Router()

router.get('/:cid', [
    validarJWT,
    check('cid', 'No es valido el ID del carrito').isMongoId(),
    validarCampos
], getCartById)

router.post('/:cid/product/:pid', [
    validarJWT,
    check('cid', 'No es valido el ID del carrito').isMongoId(),
    check('pid', 'No es valido el ID del producto').isMongoId(),
    validarCampos
], addProductInCart)

router.delete('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'No es valido el ID del carrito').isMongoId(),
    check('pid', 'No es valido el ID del producto').isMongoId(),
    validarCampos
], deleteProductsInCart)

router.put('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'No es valido el ID del carrito').isMongoId(),
    check('pid', 'No es valido el ID del producto').isMongoId(),
    validarCampos
], updateProductsInCart)

router.get("/:cid/purchase", async (req, res) => {
    const carritoId = req.params.cid
    try {
        const carrito = await cartModel.findById(carritoId)
        const arrayProductos = carrito.products
        const productosNoDisponibles = []
        const productosComprados = []

        for (const item of arrayProductos) {
            const productId = item.id
            const product = await productModel.findById(productId)

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity
                await product.save()
                productosComprados.push(item)
            } else {
                productosNoDisponibles.push(item)
            }
        }
        console.log(`Total calculado: ${calcularTotal(productosComprados)}`)

        const usuarioDelCarrito = await userModel.findOne({ cart: carritoId })

        const ticketCode = generateUniqueCode()
        const purchaserEmail = usuarioDelCarrito ? usuarioDelCarrito.email : "Usuario no encontrado"

        const ticket = new ticketModel({
            code: ticketCode,
            purchase_datetime: new Date(),
            amount: calcularTotal(productosComprados),
            purchaser: usuarioDelCarrito
        });

        await ticket.save()

        carrito.products = productosNoDisponibles

        await carrito.save()

        res.json({
            message: "Compra generada",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser,
            },
            productosNoDisponibles: productosNoDisponibles.map((item) => item.product),
        });
    } catch (error) {
        console.error("Error general: ", error)
        res.status(500).json({ message: "Error del servidor al crear ticket", error: error.message })
    }
});



export { router as cartsRouter }