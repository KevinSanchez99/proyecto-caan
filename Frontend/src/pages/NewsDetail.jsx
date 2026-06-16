import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getNewsBySlugRequest, deleteNewsRequest } from '../../api/auth';
import { useAuth } from "../context/AuthContext";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { temaNoticiasCAAN } from '../utils/themes/temaNoticiasCAAN';

import { MdArrowBack} from "react-icons/md";


export default function NewsDetail() {
    const { slug } = useParams(); 
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); 
    
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const editor = useCreateBlockNote();

    useEffect(() => {
        const fetchArticle = async () => {
        setIsLoading(true);
        try {
            const response = await getNewsBySlugRequest(slug);
            const data = response.data;
            setArticle(data);

            if (data.contenido) {
            await editor.replaceBlocks(editor.topLevelBlocks, data.contenido);
            }

        } catch (error) {
            console.error("Error al cargar la noticia:", error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchArticle();
    }, [slug, editor]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar esta noticia? Esta acción no se puede deshacer.");
        if (confirmDelete) {
        try {
            await deleteNewsRequest(article._id);
            navigate('/news'); 
        } catch (error) {
            console.error("Error al eliminar la noticia:", error);
            alert("Hubo un error al eliminar la noticia.");
        }
        }
    };

    if (isLoading) {
        return (
        <div className="min-h-screen flex flex-col pt-20 bg-background">
            <Navbar />
            <main className="grow flex items-center justify-center">
            <div className="text-xl font-bold">Cargando noticia...</div>
            </main>
            <Footer />
        </div>
        );
    }

    if (!article) {
        return (
        <div className="min-h-screen flex flex-col pt-20 bg-background">
            <Navbar />
            <main className="grow flex flex-col items-center justify-center gap-4">
                <div className="text-2xl font-bold text-gray-500">Noticia no encontrada</div>
                <Link to="/news" className="text-emerald-700 hover:underline">Volver a noticias</Link>
            </main>
            <Footer />
        </div>
        );
    }

    const formattedDate = new Date(article.createdAt).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20">
        <Navbar />
        <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
            
            {/* Controles superiores */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <Link to="/news" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-bold transition-colors">
                    <span className="text-xl mr-2" style={{ fontVariationSettings: "'FILL' 0" }}><MdArrowBack/></span>
                    Volver a todas las noticias
                </Link>

                {isAuthenticated && (
                    <div className="grid grid-cols-2 gap-3">
                        <Link to={`/news/edit/${article.slug}`} className="w-full py-3 p-2 rounded-md bg-blue-300 border border-blue-400 text-blue-900 font-label-sm text-label-sm shadow-sm transition-transform duration-200 hover:scale-[1.03]">
                            Modificar
                        </Link>
                        <button onClick={handleDelete} className="w-full py-3 rounded-md bg-red-300 border border-red-400 text-red-900 font-label-sm text-label-sm shadow-sm transition-transform duration-200 hover:scale-[1.03]">
                            Eliminar
                        </button>
                    </div>
                )}
            </div>

            <article>
            {/* Cabecera del artículo */}
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        {article.categoria}
                    </span>
                    <span className="text-outline text-sm">
                        {formattedDate}
                    </span>
                </div>
                <h1 className="font-h1 text-[40px] md:text-[50px] text-on-surface leading-tight mb-6">
                    {article.titulo}
                </h1>
            </header>

            {/* Imagen de portada */}
            <div className="w-full h-100 md:h-125 rounded-2xl overflow-hidden mb-12 shadow-lg">
                <img 
                src={article.imagen_portada} 
                alt={article.titulo} 
                className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-none text-on-surface-variant leading-relaxed pb-12">
                <BlockNoteView 
                editor={editor} 
                editable={false}
                theme={temaNoticiasCAAN} 
                />
            </div>
            </article>

        </main>
        <Footer />
        </div>
    );
}