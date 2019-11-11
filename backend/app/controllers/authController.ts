import { Request, Response } from 'express'
import Users, {IUsers} from '../models/Users'
import jwt from 'jsonwebtoken'

class AuthController {
    public async signup(req: Request, res: Response): Promise<Response> {
        try{
            const {name, email, password, google} = req.body
            const newUser: IUsers = new Users({
                name,
                email,
                password,
                google
            })
            newUser.password = await newUser.encryptPassword(newUser.password)
            await newUser.save()
            res.json({
                success: true,
                data: newUser
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Problema al registrar el Usuario',
                err
            })
        }
    }

    public async signin(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Users.findOne({email: req.body.email})
            if(!data) {
                return res.status(400).json({
                    sucess: false,
                    message: 'No se ha encontrado el email del Usuario'
                })
            }
            const correctPassword: boolean = await data.validatePassword(req.body.password)
            if(!correctPassword){
                return res.status(400).json({
                    success: false,
                    message: 'Contraseña erronea'
                })
            }
            const token = jwt.sign({id: data._id}, process.env.TOKEN_SECRET || 'alkjsdu89ioj', {
                expiresIn: 60 * 60 * 24
            })
            res.header('authotization', token).json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se pudo autenticar el Usuario',
                err
            })
        }
    }

    public async profile (req: Request , res: Response): Promise<void> {
        console.log(req.headers['authorization'])
    }
}

export const authController = new AuthController()