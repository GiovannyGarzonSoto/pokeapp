import {Request, Response} from 'express'
import Types, {ITypes} from '../models/Types'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

//cloudinary config
require('../config/cloudinary')

class TypesController {
    public async listAll (req: Request, res: Response): Promise<Response> {
        try {
            const data = await Types.find()
                .sort('name')
                .exec()
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Tipos'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar los Tipos',
                err
            })
        }
    }

    public async list (req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Types.findById(id)
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'El Tipo no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un problema al listar el Tipo',
                err
            })
        }
    }

    public async add (req: Request, res: Response): Promise<Response> {
        try {
            const {name} = req.body
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            const newType: ITypes = new Types({
                name,
                imageUrl: result.secure_url,
                publicId: result.public_id
            }) 
            await newType.save()
            await fs.unlink(req.file.path)
            res.json({
                success: true,
                data: newType
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Tipo',
                err
            })
        }
    }
}

export const typesController = new TypesController()