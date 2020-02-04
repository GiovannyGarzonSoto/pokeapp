import {Request, Response} from 'express'
import Classes, {IClasses} from '../models/Classes'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

//cloudinary config
require('../config/cloudinary')

class ClassesController {
    public async listAll (req: Request, res: Response): Promise<Response> {
        try {
            const data = await Classes.find()
                .sort('name')
                .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar las Clases'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err) {
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar las Clases',
                err
            })
        }
    }

    public async list (req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Classes.findById(id)
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'La Clase no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Ha ocurrido un problema al listar la Clase',
                err
            })
        }
    }

    public async add (req: Request, res: Response): Promise<Response> {
        try {
            const {name} = req.body
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            const newClass: IClasses = new Classes({
                name,
                imageUrl: result.secure_url,
                publicId: result.public_id
            }) 
            await newClass.save()
            await fs.unlink(req.file.path)
            res.json({
                success: true,
                data: newClass
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar la Clase',
                err
            })
        }
    }

}

export const classesController = new ClassesController()