import { Schema, model, Document } from 'mongoose'

export interface IAbilities extends Document{
    name: string,
    description: string
}

const AbilitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la Habilidad es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion de la Habilidad es obligatoria']
    }
})

export default model<IAbilities>('Abilities', AbilitySchema)