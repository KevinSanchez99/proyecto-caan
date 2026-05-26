import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';

export async function createToken(payload){
    return new Promise((res,rej) =>{
        jwt.sign(payload,SECRET_JWT_KEY,{expiresIn:'1h'},(err, token)=>{
            if (err) rej(err);
            res(token);
        });
    });
}