import { useRef, useEffect, useState } from "react";
import { FiFilter } from 'react-icons/fi';

export default function FilterAnimal({ onApplyFilters }) {
    const modalRef = useRef(null);
    const [filters, setFilters] = useState({
        nombre: '',
        raza: '',
        pelaje: '',
        sexo: '',
        tamaño: '',
        edad: '',
        unidad_edad: '',
    });

    const abrirModalFiltros = () => {
        if (modalRef.current) modalRef.current.showModal();
        // bloquear scroll de fondo
        document.body.style.overflow = "hidden";
    };

    const cerrarModalFiltros = () => {
        if (modalRef.current) modalRef.current.close();
        // restaurar scroll
        document.body.style.overflow = "";
    };

    useEffect(() => {
        const dialog = modalRef.current;
        if (!dialog) return;

        const handleClose = () => {
            document.body.style.overflow = "";
        };

        dialog.addEventListener("close", handleClose);
        return () => {
            dialog.removeEventListener("close", handleClose);
            document.body.style.overflow = "";
        };
    }, []);

        return (
            <>
            <div className="flex flex-row items-end-safe justify-between gap-4">
                

                    {/*
                <div className="relative flex-1 min-w-0">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                            data-icon="search"></span>
                    <input className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md placeholder-outline"
                            placeholder="Buscar por ..." type="text" />
                </div>
                */}

                <button
                    type="button"
                    aria-label="Más opciones"
                    onClick={abrirModalFiltros}
                    className="p-2 rounded-full bg-white border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant"
                >
                    <FiFilter size={24} aria-hidden className="text-on-surface-variant" />
                    <span className="sr-only">Más opciones</span>
                </button>
            </div>

            <dialog ref={modalRef} className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface">
                <h2 className="font-h2 text-h2 text-emerald-800 mb-6">Filtros de búsqueda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    
                    <div>
                        <label className="block text-lg mb-2 text-emerald-800 font-semibold">Nombre del perro</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" 
                            placeholder="Ej: Firulais"
                            name="nombre"
                            value={filters.nombre}
                            onChange={(e) => setFilters((prev) => ({ ...prev, nombre: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2 text-emerald-800 font-semibold">Raza</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" 
                            placeholder="Ej: Mestizo" 
                            name="raza"
                            value={filters.raza}
                            onChange={(e) => setFilters((prev) => ({ ...prev, raza: e.target.value }))}
                        />
                    </div>

                                <div>
                                    <label className="block text-lg mb-2 text-emerald-800 font-semibold">Pelaje</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" 
                                        placeholder="Ej: Corto" 
                                        name="pelaje"
                                        value={filters.pelaje}
                                        onChange={(e) => setFilters((prev) => ({ ...prev, pelaje: e.target.value }))}
                                    />
                                </div>

                                <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Sexo</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="sexo" value={filters.sexo} onChange={(e) => setFilters((prev) => ({ ...prev, sexo: e.target.value }))}>
                                    <option value="">Selecciona el sexo</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Hembra">Hembra</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Tamaño</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="tamaño" value={filters.tamaño} onChange={(e) => setFilters((prev) => ({ ...prev, tamaño: e.target.value }))}>
                                    <option value="">Selecciona el tamaño</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                <label className="block text-lg mb-2 text-emerald-800 font-semibold">Edad aproximada</label>
                                    <input 
                                        type="text" 
                                        inputMode="numeric" 
                                        pattern="[0-9]*"
                                        className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" 
                                        placeholder="Ej: 2" 
                                        name="edad"
                                        value={filters.edad}
                                        onChange={(e) => setFilters((prev) => ({ ...prev, edad: e.target.value.replace(/[^0-9]/g, '') }))}
                                    />
                                </div>

                                <div>
                                    <select className="w-full p-3 rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" name="unidad_edad" value={filters.unidad_edad} onChange={(e) => setFilters((prev) => ({ ...prev, unidad_edad: e.target.value }))}>
                                        <option value=""> Unidad</option>
                                        <option value="meses">Meses</option>
                                        <option value="años">Años</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        type="button"
                        onClick={() => {
                            const resetFilters = {
                                nombre: '',
                                raza: '',
                                pelaje: '',
                                sexo: '',
                                tamaño: '',
                                edad: '',
                                unidad_edad: '',
                            };
                            setFilters(resetFilters);
                            if (onApplyFilters) onApplyFilters({});
                            cerrarModalFiltros();
                        }}
                        className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                        Resetear filtros
                    </button>
                    <button 
                        onClick={cerrarModalFiltros}
                        className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                        Cerrar
                    </button>
                    <button 
                        type="button"
                        onClick={() => {
                            const appliedFilters = {};
                            Object.entries(filters).forEach(([key, value]) => {
                                if (value && value.toString().trim() !== '') {
                                    appliedFilters[key] = value;
                                }
                            });
                            if (onApplyFilters) onApplyFilters(appliedFilters);
                            cerrarModalFiltros();
                        }}
                        className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-medium"
                    >
                        Filtrar
                    </button>
                </div>
            </dialog>
    </>
    );
}


