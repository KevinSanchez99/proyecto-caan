import { Router } from 'express';
import { NewsController } from '../controllers/news.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { newsSchema, updateNewsSchema } from '../schemas/news.schema.js';
import { validateSchema } from '../middlewares/validator.js';

export const newsRouter = Router();

newsRouter.get('/', NewsController.getAllNews);
newsRouter.post('/', validateSchema(newsSchema), verifyToken, NewsController.createNews);
newsRouter.delete('/:id', verifyToken, NewsController.deleteNews);
newsRouter.patch('/:id', validateSchema(updateNewsSchema), verifyToken, NewsController.updateNews);