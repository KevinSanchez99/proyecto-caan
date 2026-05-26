import { Router } from 'express';
import { AnimalController } from '../controllers/animals.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { animalSchema, updateAnimalSchema } from '../schemas/animal.schema.js';

export const animalsRouter = Router();

animalsRouter.get('/', AnimalController.getAllAnimals);
animalsRouter.post('/', verifyToken, validateSchema(animalSchema), AnimalController.createAnimal);
animalsRouter.delete('/:id',verifyToken, AnimalController.deleteAnimal);
animalsRouter.patch('/:id',verifyToken, validateSchema(updateAnimalSchema), AnimalController.updateAnimal);