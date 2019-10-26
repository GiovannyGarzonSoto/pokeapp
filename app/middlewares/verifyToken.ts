import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface IPayload {
    id: string
    iat: number
    exp: number
}

export const verifyToken = (req: Request, res: Response, next: NextFunction)  => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'El Token es necesario'
        })
    }
    const payload = jwt.verify(token, process.env.TOKEN_SEED) as IPayload
    req.userId = payload.id
    next()
}