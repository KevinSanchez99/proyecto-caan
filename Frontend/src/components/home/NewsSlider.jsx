import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsRequest } from '../../../api/auth.js'; 
import { MdArrowForward } from 'react-icons/md';

const NewsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Traemos las 3 noticias más recientes
                const res = await getNewsRequest(1, 3);
                if (res.data && res.data.docs) {
                    setNews(res.data.docs);
                }
            } catch (error) {
                console.error("Error al obtener las noticias:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const totalSlides = news.length;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    // Función auxiliar para extraer el texto de previsualización del contenido mixto
    const getPreviewText = (contenido) => {
        if (!contenido) return "";
        if (typeof contenido === 'string') {
            return contenido.length > 180 ? contenido.substring(0, 180) + "..." : contenido;
        }
        if (Array.isArray(contenido)) {
            for (const block of contenido) {
                if (block.content && Array.isArray(block.content) && block.content.length > 0) {
                    const text = block.content.map(t => t.text).join("");
                    if (text.trim().length > 0) {
                        return text.length > 180 ? text.substring(0, 180) + "..." : text;
                    }
                }
            }
        }
        return "";
    };

    if (loading) {
        return <div className="text-center py-16 text-stone-500 font-medium">Cargando noticias recientes...</div>;
    }

    if (news.length === 0) {
        return null; 
    }

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-[93%] mx-auto px-6">
                
                {/* Título de la sección */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-900 mb-2">Últimas Novedades</h2>
                        <p className="text-stone-600">Entérate de las actividades, eventos y noticias de nuestra comunidad.</p>
                    </div>
                    <a href="/news" className="hidden sm:flex font-semibold text-emerald-900 hover:text-emerald-700 transition-colors items-center gap-1">
                                            Ver todas <span className="flex items-center"><MdArrowForward/></span>
                    </a>
                </div>
                
                <div className="relative w-full bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-outline-variant/20 rounded-3xl group">
                    
                    <div className="relative overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out w-full"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {news.map((item, index) => {
                                const formattedDate = new Date(item.createdAt).toLocaleDateString('es-ES', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                });

                                return (
                                    <article key={item._id || index} className="w-full shrink-0 flex flex-col md:flex-row min-h-100 lg:h-112.5">
                                        
                                        {/* Bloque Izquierdo: Imagen de portada */}
                                        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden shrink-0">
                                            <img 
                                                src={item.imagen_portada} 
                                                alt={item.titulo} 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-emerald-800 text-white font-semibold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                    {item.categoria}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Bloque Derecho: Textos y botón de acción */}
                                        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start bg-white">
                                            <span className="text-stone-400 text-xs font-semibold mb-3 tracking-wide uppercase">
                                                {formattedDate}
                                            </span>
                                            <h3 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-4 line-clamp-2 leading-tight">
                                                {item.titulo}
                                            </h3>
                                            <p className="text-stone-600 text-base mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-4 leading-relaxed">
                                                {getPreviewText(item.contenido)}
                                            </p>
                                            <Link 
                                                to={`/news/${item.slug}`} 
                                                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-full hover:bg-emerald-900 active:scale-95 transition-all shadow-sm gap-2"
                                            >
                                                Leer noticia completa
                                            </Link>
                                        </div>

                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* Flechas flotantes de navegación */}
                    {totalSlides > 1 && (
                        <>
                            <button 
                                onClick={prevSlide} 
                                className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center bg-white hover:bg-stone-50 rounded-full shadow-lg border border-stone-150 text-stone-700 transition-all z-10 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
                                aria-label="Noticia anterior"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center bg-white hover:bg-stone-50 rounded-full shadow-lg border border-stone-150 text-stone-700 transition-all z-10 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
                                aria-label="Siguiente noticia"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
                <div className="mt-8 text-center sm:hidden">
                    <a href="/news" className="inline-flex bg-stone-200 text-stone-900 font-semibold px-6 py-3 rounded-full">
                        Ver todas las noticias
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewsSlider;