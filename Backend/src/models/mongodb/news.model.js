import mongoose from 'mongoose';

const { Schema } = mongoose;

const newsSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    imagen_portada: {
        type: String,
        required: true,
    },
    publicado: {
        type: Boolean,
        required: true,
        default: false, 
    }
}, { timestamps: true }); 

const News = mongoose.model('News', newsSchema);

export class NewsModel {

  // Obtener todas las noticias
    static async getAllNews() {
        try {
            return await News.find();
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
            throw new Error('No se pudieron obtener las noticias.');
            }
    }

  // Crear una nueva noticia
    static async createNews(input) {
    try {
        const newNews = new News(input);
        await newNews.save();
        return newNews;
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        throw new Error('No se pudo crear la noticia.');
    }
    }

  // Obtener una noticia por su 'slug'
    static async getNewsBySlug(slug) {
        try {
            const news = await News.findOne({ slug });
            if (!news) {
                throw new Error('Noticia no encontrada');
            }
            return news;
        } catch (error) {
            console.error('Error al obtener la noticia:', error);
            throw new Error('No se pudo obtener la noticia.');
        }
    }

  // Actualizar una noticia por su 'id'
    static async updateNews(id, input) {
        try {
            const updatedNews = await News.findByIdAndUpdate(id, input, { returnDocument: 'after' });
            if (!updatedNews) {
                throw new Error('Noticia no encontrada');
            }
            return updatedNews;
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            throw new Error('No se pudo actualizar la noticia.');
        }
    }

  // Eliminar una noticia por 'id'
    static async deleteNews(id) {
        try {
            const deletedNews = await News.findByIdAndDelete(id);
            if (!deletedNews) {
                throw new Error('Noticia no encontrada');
        }
        return deletedNews;
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
            throw new Error('No se pudo eliminar la noticia.');
        }
    }
}