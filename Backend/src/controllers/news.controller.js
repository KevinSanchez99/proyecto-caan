import { NewsModel } from "../models/mongodb/news.model.js";

export class NewsController {

    // Obtener todas las noticias
    static async getAllNews(req, res) {
        try {
            const news = await NewsModel.getAllNews();
            res.status(200).json(news);
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    // Obtener una noticia por su slug
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

    // Crear una nueva noticia
    static async createNews(req, res) {
        try {
            const newNews = await NewsModel.createNews(req.body);
            res.status(201).json(newNews);
        } catch (error) {
            console.error('Error al crear la noticia:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    // Actualizar una noticia por id
    static async updateNews(req, res) {
        try {
            const { id } = req.params; 
            const updatedNews = await NewsModel.updateNews(id, req.body);
            if (!updatedNews) {
                return res.status(404).json({ message: 'Noticia no encontrada' });
            }
            res.status(200).json(updatedNews);
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    // Eliminar una noticia por 'id'
    static async deleteNews(req, res) {
        try {
            const { id } = req.params;
            const deletedNews = await NewsModel.deleteNews(id);
            if (!deletedNews) {
                return res.status(404).json({ message: 'Noticia no encontrada' });
            }
            res.status(200).json({ message: 'Noticia eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
            return res.status(500).json({ message: error.message });
        }
    }
}