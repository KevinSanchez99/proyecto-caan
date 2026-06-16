import { Link } from 'react-router-dom';
import { getPreviewText } from '../../utils/newsUtils';

const NewsCard = ({ article }) => {
    const formattedDate = new Date(article.createdAt).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <Link to={`/news/${article.slug}`} className="block h-full">
            <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] group border border-outline-variant/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col">
                <div className="h-48 overflow-hidden relative shrink-0">
                    <img
                        src={article.imagen_portada}
                        alt={`Portada de ${article.titulo}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-surface/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                            {article.categoria}
                        </span>
                    </div>
                </div>
                
                <div className="p-8 grow flex flex-col items-start">
                    <div className="text-outline font-label-sm text-label-sm mb-2 text-xs">
                        {formattedDate}
                    </div>
                    
                    <h3 className="font-h3 text-h3 text-on-surface mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {article.titulo}
                    </h3>
                    
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3 grow">
                        {getPreviewText(article.contenido, 120)}
                    </p>
                    
                    <span className="text-emerald-600 font-bold mt-auto group-hover:text-emerald-800 group-hover:underline transition-colors">
                        Ver más
                    </span>
                </div>
            </article>
        </Link>
    );
};

export default NewsCard;