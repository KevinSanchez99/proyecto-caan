import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { createNewsRequest, uploadMediaRequest } from '../../api/auth';
import { useAuth } from "../context/AuthContext";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { es } from "@blocknote/core/locales";

import { MdArrowBack } from 'react-icons/md';

import { temaNoticiasCAAN } from '../utils/themes/temaNoticiasCAAN';

export default function NewsCreate() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const editor = useCreateBlockNote({
        dictionary: es,
        uploadFile: async (file) => {
            try {
                const formData = new FormData();
                formData.append('file', file); 

                const response = await uploadMediaRequest(formData);
                return response.data.url;
            } catch (error) {
                console.error("Error subiendo el archivo:", error);
                alert("Hubo un error al subir el archivo multimedia.");
                return "";
            }
        }
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
        categoria: "General" 
    }
    });

    const titulo = useWatch({
    control,
    name: "titulo"
    });

    useEffect(() => {
        if (titulo) {
            const generatedSlug = titulo
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            .replace(/[^a-z0-9]+/g, '-') 
            .replace(/(^-|-$)+/g, ''); 
            setValue("slug", generatedSlug);
        }
    }, [titulo, setValue]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const formData = new FormData();
            
            formData.append('titulo', data.titulo);
            formData.append('slug', data.slug);
            formData.append('categoria', data.categoria);
            formData.append('publicado', true);
            
            formData.append('contenido', JSON.stringify(editor.document));

            if (data.imagen_portada && data.imagen_portada.length > 0) {
                formData.append('imagen_portada', data.imagen_portada[0]);
            } else {
                setErrorMsg("La imagen de portada es obligatoria.");
                setIsSubmitting(false);
                return;
            }

            await createNewsRequest(formData);
            
            navigate('/news');
        
        } catch (error) {
            console.error("Error al crear la noticia:", error);
            setErrorMsg(error.response?.data?.message || "Ocurrió un error al crear la noticia.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-25">
        <Navbar />
        <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
            
            <Link to="/news" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-bold mb-8 transition-colors">
                <span className="text-2xl mr-2"><MdArrowBack/></span>
                Volver a noticias
            </Link>

            <h1 className="font-h1 text-[40px] text-on-surface mb-8">Crear Nueva Noticia</h1>

            {errorMsg && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 font-bold border border-red-200">
                {errorMsg}
            </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Título y Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Título de la noticia *</label>
                    <input 
                        type="text" 
                        {...register("titulo", { required: "El título es obligatorio", minLength: 5 })}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-emerald-600 outline-none transition-all"
                        placeholder="Ej: Rescatamos a 5 gatitos..."
                    />
                    {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">Slug (URL amigable) *</label>
                    <input 
                        type="text" 
                        {...register("slug", { required: "El slug es obligatorio" })}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-emerald-600 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Categoría */}
            <div className="w-full md:w-1/2 pr-0 md:pr-3">
                <label className="block text-sm font-bold text-on-surface mb-2">Categoría *</label>
                <select 
                    {...register("categoria")}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-emerald-600 outline-none transition-all"
                    >
                    <option value="General">General</option>
                    <option value="Rescate">Rescate</option>
                    <option value="Instalaciones">Instalaciones</option>
                    <option value="Comunidad">Comunidad</option>
                    <option value="Salud">Salud</option>
                    <option value="Adopciones">Adopciones</option>
                </select>
            </div>

            {/* Imagen de Portada */}
            <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Imagen de Portada *</label>
                <input 
                type="file" 
                accept="image/*"
                {...register("imagen_portada", { required: "Debes seleccionar una imagen" })}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-emerald-600 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {errors.imagen_portada && <p className="text-red-500 text-sm mt-1">{errors.imagen_portada.message}</p>}
            </div>

            {/* Editor de BlockNote */}
            <div className="pt-4">
                <label className="block text-sm font-bold text-on-surface mb-4">Contenido de la noticia</label>
                <div className="border border-outline-variant rounded-xl overflow-hidden bg-white shadow-sm min-h-75 py-4">
                    <BlockNoteView editor={editor} theme={temaNoticiasCAAN} />
                </div>
                <p className="text-xs text-outline mt-2">Tip: Usá el atajo "/" dentro del editor para agregar distintos formatos como títulos, listas o negritas.</p>
            </div>

            {/* Botón de Submit */}
            <div className="pt-6 flex justify-end">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {isSubmitting ? "Guardando y subiendo imagen..." : "Crear Noticia"}
                </button>
            </div>

            </form>
        </main>
        <Footer />
        </div>
    );
}