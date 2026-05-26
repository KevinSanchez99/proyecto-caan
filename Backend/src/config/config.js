import dotenv from 'dotenv';
dotenv.config(); 

export const PORT = process.env.PORT || 3000;
export const SALT_ROUND = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND) : 10;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'clave_por_defecto_segura';