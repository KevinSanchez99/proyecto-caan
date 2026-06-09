import { Router } from 'express';
import { uploadFile } from '../middlewares/upload.js'; 
import { uploadMedia } from '../config/cloudinary.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const uploadRouter = Router();

uploadRouter.post('/', verifyToken, uploadFile, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se envió ningún archivo' });
        }
        // Subimos a Cloudinary
        const fileUrl = await uploadMedia(req.file.buffer);
        
        res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error('Error al subir multimedia:', error);
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
});