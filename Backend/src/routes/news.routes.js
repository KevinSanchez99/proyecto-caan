import { Router } from 'express';
import { NewsController } from '../controllers/news.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { newsSchema, updateNewsSchema } from '../schemas/news.schema.js';
import { validateSchema } from '../middlewares/validator.js';
import { uploadCover } from '../middlewares/upload.js';

export const newsRouter = Router();

newsRouter.get('/', NewsController.getAllNews);
newsRouter.get('/:slug', NewsController.getNewsBySlug);
newsRouter.post('/', verifyToken, uploadCover, validateSchema(newsSchema), NewsController.createNews);
newsRouter.delete('/:id', verifyToken, NewsController.deleteNews);
newsRouter.patch('/:id', verifyToken, uploadCover, validateSchema(updateNewsSchema),  NewsController.updateNews);