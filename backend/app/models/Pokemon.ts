import { model, Document, Schema} from 'mongoose'

export interface IPokemon extends Document {
    number: number
    name: string
    description: string
    weight: number
    height: number
    hp: number
    attack: number
    defense: number
    spAttack: number
    spDefense: number
    speed: number
    imageUrl: String
    publicId: String
    type1: Schema.Types.ObjectId
    type2?: Schema.Types.ObjectId
    group1: Schema.Types.ObjectId
    group2?: Schema.Types.ObjectId
    ability1: Schema.Types.ObjectId
    ability2?: Schema.Types.ObjectId
    ability3?: Schema.Types.ObjectId
}

const pokemonSchema = new Schema({
    number: {
        type: Number,
        required: [true, 'El numero del Pokemon es obligatorio']
    }, 
    name: {
        type: String,
        required: [true, 'El nombre del Pokemon es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion del Pokemon es obligatoria']
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: [true, 'Los puntos de vida son requeridos'] 
    },
    attack: {
        type: Number,
        required: [true, 'El ataque es requerido']
    },
    defense: {
        type: Number,
        required: [true, 'La defensa es requerida']
    }, 
    spAttack: {
        type: Number,
        required: [true, 'La ataque especial es requerido']
    },
    spDefense: {
        type: Number,
        required: [true, 'La defensa especial es requerida']
    }, 
    speed: {
        type: Number,
        required: [true, 'La velocidad es requerida']
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico del Pokemon es obligatorio']
    },
    type1: {
        type: Schema.Types.ObjectId,
        ref: 'Types',
        required: [true, 'El tipo del Pokemon es obligatorio']
    },
    type2: {
        type: Schema.Types.ObjectId,
        ref: 'Types',
        required: false
    },
    group1: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: [true, 'El grupo huevo del Pokemon es obligatorio']
    },
    group2: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: false
    },
    ability1: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: [true, 'La habilidad del Pokemon es obligatoria']
    },
    ability2: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: false
    },
    ability3: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: false
    }
},
{ collection: 'pokemon' })

export default model<IPokemon>('Pokemon', pokemonSchema)