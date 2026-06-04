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
            user.currentSessionToken = token;
            await user.save()
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
            user.currentSessionToken = token;
            await user.save()
            res.cookie("token",token)
            res.status(201).json({user});
        }catch(error){
            res.status(400).json({ error: error.message});
        }
    }

    static async logout(req, res){
        try {
            
            if (req.user) {
                user.currentSessionToken = null;
                await user.save();
            }
            
            res.clearCookie('token').json({ message: 'Deslogueado correctamente' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async obtainUser(req, res){
        try {
            const { _id: id,username } = req.user; 

            return res.status(200).json({ id,username });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}