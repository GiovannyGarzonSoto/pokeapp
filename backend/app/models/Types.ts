import { Schema, model, Document } from 'mongoose'

export interface ITypes extends Document {
    name: string
    imageUrl: string
    publicId: string
}

const TypeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Tipo es obligatorio']
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico del Tipo es obligatorio']
    }
})

export default model<ITypes>('Types', TypeSchema)