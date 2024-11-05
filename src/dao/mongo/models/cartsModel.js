import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const nameCollection = 'Cart'

const CartSchema = new Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            _id: false,
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Producto'
            },
            quantity: {
                type: Number,
                required: [true, 'La cantidad del producto es obligatorio']
            }
        }
    ]
})

CartSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v
        return ret
    }
})

export const cartModel = model(nameCollection, CartSchema)