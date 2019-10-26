import { Request, Response } from 'express'
import Groups, {IGroups} from '../models/Groups'

class GroupsController {
    public async listAll (req: Request, res: Response): Promise<Response> {
        try {
            const data = await Groups.find()
                .sort('name')
                .exec()
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Grupo Huevo'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar los Grupo Huevo',
                err
            })
        }
    }

    public async list (req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Groups.findById(id)
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'El Grupo Huevo no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un problema al listar el Grupo Huevo',
                err
            })
        }
    }

    public async add (req: Request, res: Response): Promise<Response> {
        try {
            const {name} = req.body
            const newGroup: IGroups = new Groups({name}) 
            await newGroup.save()
            res.json({
                success: true,
                data: newGroup
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Grupo Huevo',
                err
            })
        }
    }
}

export const groupsController = new GroupsController()