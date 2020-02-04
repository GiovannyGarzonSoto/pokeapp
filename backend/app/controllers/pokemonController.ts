import { Request, Response } from 'express'
import Pokemon, {IPokemon} from '../models/Pokemon'
import Types from '../models/Types'
import Groups from '../models/Groups'
import Abilities from '../models/Abilities'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

//cloudinary config
require('../config/cloudinary')

class PokemonController {
    public async listAll (req: Request, res: Response): Promise<Response> {
        try{
            const data = await Pokemon.find()
                .populate('type1').populate('type2')
                .populate('group1').populate('group2')
                .populate('ability1').populate('ability2').populate('ability3')
                .sort('number')
                .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Pokemon'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Pokemon',
                err
            })
        }
    }

    public async list (req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Pokemon.findById(id)
                .populate('type1').populate('type2')
                .populate('group1').populate('group2')
                .populate('ability1').populate('ability2').populate('ability3')
                .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Pokemon no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar el Pokemon',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const { number, name, description, weight, height, hp, attack, defense, spAttack, spDefense, speed, type1, type2, group1, group2, ability1, ability2, ability3 } = req.body
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            const newPokemon: IPokemon = new Pokemon({
                number,
                name,
                description,
                weight,
                height,
                hp,
                attack,
                defense, 
                spAttack,
                spDefense,
                speed,
                imageUrl: result.secure_url,
                publicId: result.public_id,
                type1,
                type2,
                group1,
                group2,
                ability1,
                ability2,
                ability3
            })
            const data = await newPokemon.save()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'No se ha podido agregar el Pokemon',
                })
            }
            await fs.unlink(req.file.path)
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un problema al agregar el Pokemon',
                err
            })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const { number, name, description, weight, height, hp, attack, defense, spAttack, spDefense, speed, type1, type2, group1, group2, ability1, ability2, ability3 } = req.body

            //eliminar del servidor
            const pokemon = await Pokemon.findById(id)
            if(!pokemon){
                return res.status(500).json({
                    success: false,
                    message: 'El Pokemon no existe',
                })
            }

            const destroyResult = await cloudinary.v2.uploader.destroy(pokemon.publicId)
            if(!destroyResult){
                return res.status(500).json({
                    success: false,
                    message: 'No se encontro la imagen en el servidor',
                })
            }
            const result = await cloudinary.v2.uploader.upload(req.file.path)
        
            const newPokemon = {
                number,
                name,
                description,
                weight,
                height,
                hp,
                attack,
                defense, 
                spAttack,
                spDefense,
                speed,
                imageUrl: result.secure_url,
                publicId: result.public_id,
                type1,
                type2,
                group1,
                group2,
                ability1,
                ability2,
                ability3
            }
            const updatedPokemon: IPokemon = await Pokemon.findByIdAndUpdate(id, newPokemon, {new: true}) 

            if(!updatedPokemon){
                return res.status(500).json({
                    success: false,
                    message: 'El Pokemon no existe',
                })
            }
            await fs.unlink(req.file.path)
            res.json({
                success: true,
                data: updatedPokemon
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un problema al actualizar el Pokemon',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedPokemon: IPokemon = await Pokemon.findByIdAndRemove(id)
            if(!removedPokemon){
                return res.status(400).json({
                    success: false,
                    message: 'El Pokemon no existe',
                })
            }
            const result = await cloudinary.v2.uploader.destroy(removedPokemon.publicId)
            if(!result){
                return res.status(400).json({
                    success: false,
                    message: 'No se encontro la imagen en el servidor',
                })
            }
            res.json({
                success: true,
                data: removedPokemon
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un problema al eliminar el Pokemon',
                err
            })
        }
    }
}

export const pokemonController = new PokemonController()