import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(); 

const accounts = [
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME_1,
        api_key: process.env.CLOUDINARY_API_KEY_1,
        api_secret: process.env.CLOUDINARY_API_SECRET_1
    },
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME_2,
        api_key: process.env.CLOUDINARY_API_KEY_2,
        api_secret: process.env.CLOUDINARY_API_SECRET_2
    },
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME_3,
        api_key: process.env.CLOUDINARY_API_KEY_3,
        api_secret: process.env.CLOUDINARY_API_SECRET_3
    }
];

export const uploadMedia = async (buffer) => {
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        
        if (!account.cloud_name || !account.api_key || !account.api_secret) continue;

        try {
            const url = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        folder: 'caan_noticias',
                        resource_type: 'auto',
                        ...account 
                    }, 
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );
                uploadStream.end(buffer);
            });

            console.log(`Archivo subido con éxito a la cuenta Cloudinary: ${account.cloud_name}`);
            return url;

        } catch (error) {
            console.warn(`La cuenta Cloudinary ${i + 1} (${account.cloud_name}) falló o alcanzó su límite. Probando la siguiente...`);
            
            if (i === accounts.length - 1) {
                throw new Error('Todas las cuentas de Cloudinary configuradas fallaron o alcanzaron su límite de uso.');
            }
        }
    }
};

// eliminar media (Detecta automáticamente a qué cuenta pertenece y la borra)
export const deleteMedia = async (imageUrl) => {
    try {
        if (!imageUrl) return;
        
        const urlParts = imageUrl.split('/');
        
        const cloudNameIndex = urlParts.findIndex(part => part === 'res.cloudinary.com') + 1;
        const cloudName = urlParts[cloudNameIndex];

        const account = accounts.find(acc => acc.cloud_name === cloudName);

        if (!account) {
            console.error(`No se encontraron credenciales locales para la cuenta de Cloudinary: ${cloudName}`);
            return;
        }

        const filename = urlParts.pop(); 
        const folder = urlParts.pop();   
        const publicId = `${folder}/${filename.split('.')[0]}`; 

        await cloudinary.uploader.destroy(publicId, account);
        console.log(`Archivo eliminado con éxito de la cuenta Cloudinary: ${cloudName}`);
    } catch (error) {
        console.error("Error al borrar la imagen de Cloudinary:", error);
    }
};