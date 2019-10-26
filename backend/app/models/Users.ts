import { model, Document, Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

export interface IUsers extends Document{
    name: string
    email: string
    password: string
    google?: boolean
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre de Usuario es obligatorio']
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, 'La contraseña de Usuario es obligatoria']
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(uniqueValidator, {message: 'El nombre de Usuario {PATH} ya existe'})

userSchema.methods.encryptPassword = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

export default model<IUsers>('Users', userSchema)