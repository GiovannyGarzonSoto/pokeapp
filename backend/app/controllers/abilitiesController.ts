import { Request, Response } from 'express'
import Abilities, {IAbilities} from '../models/Abilities'

class AbilitiesController {
    public async listAll (req: Request, res: Response): Promise<Response> {
        try{
            const data = await Abilities.find()
                .sort('name')
                .exec()
            if(!data){
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar las Habilidades'
                })
            }
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar las Habilidades',
                err
            })
        }
    }

    public async list (req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data: IAbilities = await Abilities.findById(id)
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'La Habilidad no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar la Habilidad',
                err
            })
        }
    }

    public async add (req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body
            const newAbility: IAbilities = new Abilities({ name, description })
            await newAbility.save()
            res.json({
                success: true,
                data: newAbility
            })
        }catch(err){
            return res.status(400).json({
                success: true,
                message: 'No se ha podido agregar la Habilidad',
                err
            })
        }
    }

    public async update (req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params
            const {body} = req 
            const updatedAbility: IAbilities = await Abilities.findByIdAndUpdate(id, body, {new: true})
            if(!updatedAbility){
                return res.status(400).json({
                    success: false,
                    message: 'La habilidad no existe'
                })
            }
            res.json({
                success: true,
                data: updatedAbility
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar la Habilidad',
                err
            })
        }
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params
            const removedAbility: IAbilities = await Abilities.findByIdAndRemove(id)
            if(!removedAbility){
                return res.status(400).json({
                    success: false,
                    message: 'La habilidad no existe'
                })
            }
            res.json({
                success: true,
                message: 'Habilidad eliminada',
                data: removedAbility
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar la Habilidad',
                err
            })
        }
    }
}

export const abilitiesController = new AbilitiesController()