import { Document, model, Schema } from 'mongoose'

export interface IMoves extends Document{
    name: string
    description: string
    power?: number
    accuracy?: number
    type: Schema.Types.ObjectId
    clase: Schema.Types.ObjectId
}
const moveSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Movimiento es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion del Movimiento es oblitoria']
    },
    power: {
        type: Number,
        required: false
    },
    accuracy: {
        type: Number,
        require: false
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Types',
        required: [true, 'El tipo del Movimiento es obligatorio']
    },
    clase: {
        type: Schema.Types.ObjectId,
        ref: 'Classes',
        required: [true, 'La clase del Movimiento es obligatoria']
    }
})

export default model<IMoves>('Moves', moveSchema)