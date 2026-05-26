import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../../config/config.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export class UserModel{
    static async login({username, password}){
        try {
            const user = await User.findOne({username});
            if (!user)
                throw new Error("El username no existe");
            
            const isValid = await bcrypt.compare(password,user.password);

            if(!isValid)
                throw new Error("Contraseña incorrecta")
            
            return user;
        } catch (error) {
            console.error("Error en el login:", error);
            throw new Error("Usuario o contraseña incorrectos");
        }
    }

    static async register({username,password}){
        const existingUsername = await User.findOne({username});
        if(existingUsername)
            throw new Error(`El username ${username} ya existe`);
        
        const hashedPassword = await bcrypt.hash(password,SALT_ROUND);
        const user = new User({
            username,
            password: hashedPassword
        });

        const userSaved = await user.save();

        return userSaved;
    }

    static async obtainUserByID(id){
        try {
            const user = await User.findById(id).select('username'); 

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;
        } catch (error) {
            throw new Error('Error inesperado');
        }
}
}