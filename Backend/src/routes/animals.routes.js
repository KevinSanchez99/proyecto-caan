import { Router } from 'express';
import { AnimalController } from '../controllers/animals.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { animalSchema, updateAnimalSchema } from '../schemas/animal.schema.js';
import multer from 'multer';
import { parseFormData } from '../middlewares/parseFormData.js';

// 2. Configuramos multer para que guarde el archivo en la memoria temporalmente
const upload = multer({ storage: multer.memoryStorage() });

export const animalsRouter = Router();

animalsRouter.get('/', AnimalController.getAllAnimals);
animalsRouter.post('/', verifyToken, upload.single('foto'), parseFormData, validateSchema(animalSchema), AnimalController.createAnimal);
animalsRouter.patch('/:id', verifyToken, upload.single('foto'), parseFormData, validateSchema(updateAnimalSchema), AnimalController.updateAnimal);
animalsRouter.delete('/:id',verifyToken, AnimalController.deleteAnimal);

// Ruta para obtener un animal por ID 7/06/2026 - Tomas S
animalsRouter.get('/:id', AnimalController.getAnimalById);