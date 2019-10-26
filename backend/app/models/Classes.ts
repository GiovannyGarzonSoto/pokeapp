import { Schema, model, Document } from 'mongoose'

export interface IClasses extends Document{
    name: string
    imageUrl: string
    publicId: number
}

const ClassSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la Clase es obligatorio']
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico de la imagen es obligatorio']
    }
})

export default model<IClasses>('Classes', ClassSchema)