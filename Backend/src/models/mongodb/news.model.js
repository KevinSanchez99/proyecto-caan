import mongoose from 'mongoose';

const { Schema } = mongoose;

const newsSchema = new Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    contenido: { type: Schema.Types.Mixed, required: true }, 
    imagen_portada: { type: String, required: true },
    publicado: { type: Boolean, required: true, default: false },
    categoria: { type: String, required: true, default: 'General' } 
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export class NewsModel {

  // Obtener todas las noticias
    static async getAllNews(page = 1, limit = 6, category, search, date) {
        try {
            let query = {};
            if (category) query.categoria = category;
            
            if (search) {
                query.titulo = { $regex: search, $options: 'i' };
            }

            if (date) {
                const startOfDay = new Date(date);
                const endOfDay = new Date(date);
                endOfDay.setUTCHours(23, 59, 59, 999);
                
                query.createdAt = { $gte: startOfDay, $lte: endOfDay };
            }

            const skip = (page - 1) * limit;
            const total = await News.countDocuments(query);
            
            const docs = await News.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            return { docs, totalPages: Math.ceil(total / limit), currentPage: page };
        } catch (error) {
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