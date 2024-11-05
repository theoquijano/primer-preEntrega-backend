import { Schema, model } from 'mongoose'

const nameCollection = 'Ticket'

const TicketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const ticketModel = model(nameCollection, TicketSchema)