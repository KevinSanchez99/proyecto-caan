import { NewsModel } from "../models/mongodb/news.model.js";
import { uploadMedia, deleteMedia } from "../config/cloudinary.js";

export class NewsController {

    static async getAllNews(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const category = req.query.category;
            const search = req.query.search;
            const date = req.query.date;

            const result = await NewsModel.getAllNews(page, limit, category, search, date);
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getNewsBySlug(req, res) {
        try {
            const { slug } = req.params;
            const news = await NewsModel.getNewsBySlug(slug);
            res.status(200).json(news);
        } catch (error) {
            console.error('Error al obtener la noticia:', error);
            return res.status(404).json({ message: error.message });
        }
    }

    static async createNews(req, res) {
        try {
            let imageUrl = req.body.imagen_portada;

            if (req.file) {
                imageUrl = await uploadMedia(req.file.buffer);
            }

            if (!imageUrl) {
                return res.status(400).json({ message: 'La imagen de portada es obligatoria' });
            }

            const contenido = typeof req.body.contenido === 'string' 
                ? JSON.parse(req.body.contenido) 
                : req.body.contenido;

            const newsData = {
                ...req.body,
                contenido,
                imagen_portada: imageUrl,
                publicado: req.body.publicado === 'true'
            };

            const newNews = await NewsModel.createNews(newsData);
            res.status(201).json(newNews);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateNews(req, res) {
        try {
            const { id } = req.params; 
            let updateData = { ...req.body };

            if (updateData.contenido && typeof updateData.contenido === 'string') {
                updateData.contenido = JSON.parse(updateData.contenido);
            }
            
            if (updateData.publicado !== undefined) {
                updateData.publicado = updateData.publicado === 'true';
            }

            if (req.file) {
                const imageUrl = await uploadMedia(req.file.buffer);
                updateData.imagen_portada = imageUrl;
            }

            const updatedNews = await NewsModel.updateNews(id, updateData);
            
            if (!updatedNews) {
                return res.status(404).json({ message: 'Noticia no encontrada' });
            }
            res.status(200).json(updatedNews);
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteNews(req, res) {
        try {
            const { id } = req.params;
            
            const deletedNews = await NewsModel.deleteNews(id);
            
            if (!deletedNews) {
                return res.status(404).json({ message: 'Noticia no encontrada' });
            }

            if (deletedNews.imagen_portada) {
                await deleteMedia(deletedNews.imagen_portada);
            }

            res.status(200).json({ message: 'Noticia eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
            return res.status(500).json({ message: error.message });
        }
    }
}