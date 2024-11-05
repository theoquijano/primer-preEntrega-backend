import { Router } from 'express'
import { addProduct, deleteProduct, getProducts, getProductsById, updateProduct } from '../controllers/products.js'
import { isAdmin, validarCampos, validarJWT } from '../middleware/auth.js'
import { check } from 'express-validator'
import { existeCode, existeProduct } from '../helpers/db-validaciones.js'

const router = Router()

router.get('/', validarJWT, getProducts)

router.get('/:pid', [
    validarJWT,
    check('pid', 'No es valido el ID del producto').isMongoId(),
    validarCampos
], getProductsById)

router.post('/', [
    validarJWT,
    isAdmin,
    check('title', 'El campo title es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('code', 'El campo code es obligatorio').not().isEmpty().isNumeric(),
    check('code').custom(existeCode),
    check('price', 'El campo price es obligatorio').not().isEmpty().isNumeric(),
    check('stock', 'El campo stock es obligatorio').not().isEmpty().isNumeric(),
    check('category', 'El campo category es obligatorio').not().isEmpty(),
    validarCampos,
], addProduct)

router.put('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'No es valido el ID del producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos
], updateProduct)

router.delete('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'No es valido el ID del producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos
], deleteProduct)


export { router as productsRouter }