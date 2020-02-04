import { Schema, model, Document } from 'mongoose'

export interface IGroups extends Document{
    name: string
}

let validGroups = {
    values: ['Campo', 'Planta', 'Bicho', 'Dragon', 'Ditto', 'Agua 1', 'Agua 2', 'Agua 3', 'Monstruo', 'Volador', 'Humanoide', 'Hada', 'Amorfo', 'Mineral', 'Desconocido', '-'],
    message: '{VALUE} no es un Grupo Huevo valido'
}

const GroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Grupo Huevo es obligatorio'],
        enum: validGroups
    }
})

export default model<IGroups>('Groups', GroupSchema)