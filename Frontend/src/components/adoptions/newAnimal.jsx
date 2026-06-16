import { useRef, useState } from 'react';
import { createAnimalRequest } from '../../../api/auth'; 
import { useAuth } from "../../context/AuthContext";

export default function ModalAnimal({ onAnimalCreated }) {
    const { isAuthenticated } = useAuth();
    const modalRef = useRef(null);
    const [error, setError] = useState(null);

    const abrirModal = () => {
        if (modalRef.current) modalRef.current.showModal();
        setError(null);
    };

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const form = new FormData(e.target);
        const rawData = Object.fromEntries(form.entries());
        const archivoFoto = form.get('foto');

        const payload = {
            nombre: rawData.nombre,
            especie: 'Perro',
            raza: rawData.raza,
            pelaje: rawData.pelaje,
            sexo: rawData.sexo === 'macho' ? 'Macho' : 'Hembra', 
            tamaño: rawData.tamaño,
            estado: 'Disponible', 
            fecha_nacimiento: rawData.fecha_nacimiento,
            salud: {
                vacunado: rawData.vacunado === "1",
                castrado: rawData.castrado === "1",
                desparacitado: rawData.desparacitado === "1",
                condiciones_especiales: rawData.observaciones || 'Ninguna'
            },
            descripcion: rawData.historia,
            imagenes: ["https://verificameesta.com/foto.jpg"]
        };

        const dataToSend = new FormData();
        dataToSend.append('datos', JSON.stringify(payload)); 
        dataToSend.append('foto', archivoFoto); 

        try {
            await createAnimalRequest(dataToSend);
            alert("¡Ficha creada con éxito!");
            cerrarModal();
            e.target.reset();
            
            if (onAnimalCreated) onAnimalCreated(); 
            
        } catch (error) {
            console.error('Error al crear el animal:', error);
            if (error.response?.data?.errors) {
                setError(error.response.data.errors); 
            } else {
                setError(error.response?.data?.message || "Hubo un error al guardar el rescatado.");
            }
        }
    };

    return (
        <>
            {isAuthenticated && (
                <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition" onClick={abrirModal}>
                    <span className="text-xl font-bold text-white">+</span>
                    <span className="font-label-sm text-label-sm text-white">Nuevo Rescatado</span>
                </button>
            )}

            <dialog ref={modalRef} className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface">
                <h2 className="font-h2 text-h2 text-emerald-800 mb-6">Ingresar Nuevo Rescatado</h2>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-10">
                        {/* DATOS GENERALES */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Datos generales</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Nombre del perro</label>
                                <input type="text" name="nombre" required placeholder="Ej: Firulais" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Raza</label>
                                <input type="text" name="raza" required placeholder="Ej: Mestizo" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Pelaje</label>
                                <input type="text" name="pelaje" required placeholder="Ej: Corto" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Sexo</label>
                                <select name="sexo" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm">
                                    <option value="">Selecciona el sexo</option>
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Tamaño</label>
                                <select name="tamaño" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm">
                                    <option value="">Selecciona el tamaño</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Fecha de Nacimiento</label>
                                <input type="date" name="fecha_nacimiento" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" />
                            </div>
                        </div>

                        {/* DATOS MEDICOS */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Datos Médicos</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Vacunado</label>
                                <select name="vacunado" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm">
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Castrado</label>
                                <select name="castrado" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm">
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Desparacitado</label>
                                <select name="desparacitado" required className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm">
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Condiciones Especiales</label>
                                <textarea name="observaciones" placeholder="Ej: ceguera parcial, sordera" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-32" />
                            </div>
                        </div>

                        {/* MÁS SOBRE MÍ */}
                        <div className="flex flex-1 flex-col gap-5 p-5 rounded-3xl border border-slate-300/90 bg-slate-50 shadow-lg ring-1 ring-slate-200/90">
                            <h3 className="text-xl text-emerald-800 font-semibold mb-3">Más Sobre Mí</h3>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Historia</label>
                                <textarea name="historia" required placeholder="Ej: Muy amigable, le gusta jugar con otros" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none resize-none h-32" />
                            </div>
                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Cargue una Foto</label>
                                <input type="file" name="foto" required accept="image/png, image/jpeg, image/webp" className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none" />
                            </div>
                            
                            {error && (
                                <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-800">
                                    <p className="font-semibold mb-2">Por favor corregí lo siguiente:</p>
                                    {Array.isArray(error) ? (
                                        <ul className="list-disc list-inside text-sm">
                                            {error.map((err, index) => (
                                                <li key={index}>
                                                    <span className="capitalize font-medium">{err.path}:</span> {err.message}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm">{error}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={cerrarModal} className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancelar</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-medium">Crear Ficha</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}