import { ProductsRepository, UsersRepository } from "../repositories/index.js";


export const existeEmail = async (email) => {
    const emailExiste = await UsersRepository.getUserByEmail(email)
    if (emailExiste)
        throw new Error(`El email ${email} ya esta registrado`)

}

export const existeCode = async (code) => {
    const codeExiste = await ProductsRepository.getProductsByCode(code)
    if (codeExiste)
        throw new Error(`El codigo ${code} ya esta registrado en otro producto`)

}

export const existeProduct = async (idProduct) => {
    const productExiste = await ProductsRepository.getProductsById(idProduct)
    if (!productExiste)
        throw new Error(`El id ${idProduct} del producto no existe`)

}