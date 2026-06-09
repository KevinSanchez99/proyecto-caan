import multer from 'multer';

// Guardamos en memoria para no crear archivos temporales en el servidor
const storage = multer.memoryStorage();

// Middleware para la portada principal de la noticia
export const uploadCover = multer({ storage }).single('imagen_portada');

// Middleware genérico para archivos de BlockNote (imágenes o videos sueltos)
export const uploadFile = multer({ storage }).single('file');