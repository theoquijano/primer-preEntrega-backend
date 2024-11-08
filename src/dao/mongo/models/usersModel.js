import { Schema, model } from 'mongoose'

const nameCollection = 'user'

const UserSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    lastName: { type: String, },
    email: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'El contraseña es obligatorio'] },
    rol: { type: String, default: 'user', enum: ['user', 'admin'] },
    status: { type: Boolean, default: true },
    fechaCreacion: { type: Date, default: Date.now },
    image: { type: String },
    github: { type: Boolean, default: false },
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v
        return ret
    }
})

export const userModel = model(nameCollection, UserSchema)