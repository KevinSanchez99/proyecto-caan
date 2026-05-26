import { UserModel } from '../models/mongodb/user.model.js';
import { createToken } from '../lib/createToken.js';

export class userController{
    static async login (req, res){
        const{ username, password } = req.body;

        try {
            const user = await UserModel.login({username, password});
            const token = await createToken({
                id: user._id
            });
            res.cookie("token",token)
            res.status(200).json("logueado correctamente");
        } catch (error) {
            res.status(401).json(error.message);
        }

    }

    static async register (req, res) {
        const { username, password } = req.body;

        try{
            const user = await UserModel.register({username,password})
            const token = await createToken({
                id: user._id
            });
            res.cookie("token",token)
            res.status(201).json({user});
        }catch(error){
            res.status(400).json({ error: error.message});
        }
    }

    static logout(req, res){
        res.clearCookie('token').json({ message: 'Deslogueado correctamente' })
    }

    static async obtainUser(req, res){
        try {
            const { id } = req.user;
            
            if (!id) {
                return res.status(400).json({ message: 'ID del usuario no encontrado en el token' });
            }

            const user = await UserModel.obtainUserByID(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json({ username: user.username });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}