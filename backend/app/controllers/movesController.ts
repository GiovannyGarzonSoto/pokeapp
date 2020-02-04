import { Request, Response } from 'express'
import Moves, {IMoves} from '../models/Moves'
import Types from '../models/Types'
import Classes from '../models/Classes'

class MovesController {
    public async listAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Moves.find()
            .populate('type')
            .populate('clase')
            .sort('name')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Movimientos '
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Movimientos',
                err
            })
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Moves.findById(id)
            .populate('type')
            .populate('clase')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar el Movimiento',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const {name, description, power, accuracy, type, clase } = req.body
            const newMove: IMoves = new Moves({
                name,
                description,
                power,
                accuracy,
                type,
                clase
            })
            await newMove.save()
            res.json({
                success: true,
                data: newMove
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Movimiento',
                err
            })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const {body} = req
            const updatedMove: IMoves = await Moves.findByIdAndUpdate(id, body, {new: true})
            if(!updatedMove){
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            res.json({
                success: true,
                data: updatedMove
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Movimiento',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedMove: IMoves = await Moves.findByIdAndRemove(id)
            if(!removedMove){
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            res.json({
                success: true,
                data: removedMove
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Movimiento',
                err
            })
        }
    }
}

export const movesController = new MovesController()
