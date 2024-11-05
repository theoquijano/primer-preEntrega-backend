import { request, response } from 'express'
import { CartsRepository, UsersRepository } from '../repositories/index.js'
import { createHash, isValidPassword } from '../utils/bcryptPassword.js';
import { generateToken } from '../utils/jsonWebToken.js';
import UserDTO from '../dto/user.dto.js';


export const loginUsuario = async (req = request, res = response) => {
    try {
        const { email, password } = req.body
        const usuario = await UsersRepository.getUserByEmail(email)

        if (!usuario) return res.status(400).json({ ok: false, msg: 'Datos incorrectos' })

        const validPassword = isValidPassword(password, usuario.password)

        if (!validPassword) return res.status(400).json({ ok: false, msg: 'Datos incorrectos' })

        const { _id, name, lastName, rol } = usuario
        const token = generateToken({ _id, name, lastName, email, rol })

        return res.json({ ok: true, usuario, token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'porfavor contacte a un administrador' })
    }
}

export const current = async (req = request, res = response) => {
    if (req.usuario) {
        const usuario = req.usuario;
        const userDTO = new UserDTO(usuario);
        res.render("home", { user: userDTO });
    } else {
        res.send("No autorizado !!");
    }
}

export const crearUsuario = async (req = request, res = response) => {
    try {
        req.body.password = createHash(req.body.password)

        const carrito = await CartsRepository.createCart()

        if (!carrito) return res.status(500).json({ ok: false, msg: 'No se pudo crear el carrito' })

        req.body.cart_id = carrito._id

        const usuario = await UsersRepository.registerUser(req.body)

        const { _id, name, lastName, email, rol } = usuario

        const token = generateToken({ _id, name, lastName, email, rol })

        return res.json({ ok: true, usuario, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'porfavor contacte a un administrador' })
    }
}

