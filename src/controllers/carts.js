import { request, response } from 'express'
import { CartsRepository, ProductsRepository, UsersRepository } from '../repositories/index.js'

export const getCartById = async (req = request, res = response) => {
    try {
        const { _id } = req
        const { cid } = req.params

        const usuario = await UsersRepository.getUserById(_id)

        if (!usuario) return res.status(400).json({ ok: false, msg: 'usuario no existe!' })

        if (!(usuario.cart_id.toString() === cid)) return res.status(400).json({ ok: false, msg: 'Carrito no valido' })

        const carrito = await CartsRepository.getCartById(cid)

        return res.json({ carrito })

    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador!' })
    }
}

// export const createCart = async (req = request, res = response) => {
//     try {
//         const carrito = await CartsRepository.createCart()
//         return res.json({ msg: 'Carrito creado', carrito })
//     } catch (error) {
//         console.log('createCart -> ', error);
//         return res.status(500).json({ msg: 'Hablar con un administrador!' })
//     }
// }

export const addProductInCart = async (req = request, res = response) => {
    try {
        const { _id } = req
        const { cid, pid } = req.params

        const usuario = await UsersRepository.getUserById(_id)

        if (!usuario) return res.status(400).json({ ok: false, msg: 'usuario no existe!' })


        if (!(usuario.cart_id.toString() === cid)) return res.status(400).json({ ok: false, msg: 'Carrito no valido' })

        const existeProducto = await ProductsRepository.getProductsById(pid)

        if (!existeProducto) return res.status(400).json({ ok: false, msg: 'El producto no existe!' })

        const carrito = await CartsRepository.addProductInCart(cid, pid)

        if (!carrito)
            return res.status(404).json({ msg: `El carrito con id ${cid} no existe!` })

        return res.json({ msg: 'Carrito actualizado', carrito })
    } catch (error) {
        console.log('addProductInCart -> ', error);
        return res.status(500).json({ msg: 'Hablar con un administrador!' })
    }
}

export const deleteProductsInCart = async (req = request, res = response) => {
    try {
        const { _id } = req
        const { cid, pid } = req.params
        const usuario = await UsersRepository.getUserById(_id)

        if (!usuario) return res.status(400).json({ ok: false, msg: 'usuario no existe!' })

        if (!(usuario.cart_id.toString() === cid)) return res.status(400).json({ ok: false, msg: 'Carrito no valido' })

        const existeProducto = await ProductsRepository.getProductsById(pid)

        if (!existeProducto) return res.status(400).json({ ok: false, msg: 'El producto no existe!' })

        const carrito = await CartsRepository.deleteProductsInCart(cid, pid)

        return res.json({ msg: 'Producto eliminado del carrito', carrito })
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador!' })
    }
}

export const updateProductsInCart = async (req = request, res = response) => {
    try {
        const { _id } = req
        const { cid, pid } = req.params
        const { quantity } = req.body

        const usuario = await UsersRepository.getUserById(_id)

        if (!usuario) return res.status(400).json({ ok: false, msg: 'usuario no existe!' })

        if (!(usuario.cart_id.toString() === cid)) return res.status(400).json({ ok: false, msg: 'Carrito no valido' })

        const existeProducto = await ProductsRepository.getProductsById(pid)

        if (!existeProducto) return res.status(400).json({ ok: false, msg: 'El producto no existe!' })

        if (!quantity || !Number.isInteger(quantity))
            return res.status(404).json({ msg: 'La propiedad quantity es obligatoria, numero entero' })

        const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity)

        if (!carrito)
            return res.status(404).json({ msg: 'No se pudo realizar la operacion' })
        return res.json({ msg: 'Producto actualizado en el carrito ', carrito })
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador!' })
    }
}

// export const deleteCart = async (req = request, res = response) => {
//     try {
//         const { cid } = req.params

//         const carrito = await CartsRepository.deleteCart(cid)

//         if (!carrito)
//             return res.status(404).json({ msg: 'No se pudo realizar la operacion' })
//         return res.json({ msg: 'Producto actualizado en el carrito ', carrito })
//     } catch (error) {
//         return res.status(500).json({ msg: 'Hablar con un administrador!' })
//     }
// }