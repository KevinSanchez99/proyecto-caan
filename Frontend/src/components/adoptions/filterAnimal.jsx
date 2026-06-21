import { useRef, useEffect, useState } from "react";
import { FiFilter } from 'react-icons/fi';

export default function FilterAnimal({ onApplyFilters, isAuthenticated = false }) {
    const modalRef = useRef(null);
    const [filters, setFilters] = useState({
        nombre: '',
        raza: '',
        pelaje: '',
        sexo: '',
        tamaño: '',
        estado: '',
        fechaDesde: '',
        fechaHasta: '',
        edadMin: '',
        edadMax: '',
    });

    const abrirModalFiltros = () => {
        if (modalRef.current) modalRef.current.showModal();
        document.body.style.overflow = "hidden";
    };

    const cerrarModalFiltros = () => {
        if (modalRef.current) modalRef.current.close();
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

    const handleOutsideClick = (e) => {
        const dialog = modalRef.current;
        if (!dialog) return;

        const dialogDimensions = dialog.getBoundingClientRect();

        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            cerrarModalFiltros();
        }
    };

    return (
        <>
            <div className="flex flex-row items-end-safe justify-between gap-4">
                <button
                    type="button"
                    aria-label="Más opciones"
                    onClick={abrirModalFiltros}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-white border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant font-label-sm text-label-sm"
                >
                    <FiFilter size={24} aria-hidden className="text-on-surface-variant" />
                    <span>Filtros</span>
                </button>
            </div>

            <dialog ref={modalRef} onClick={handleOutsideClick} className="m-auto p-4 md:p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[95%] sm:w-[80%] max-w-4xl max-h-[95vh] overflow-y-auto bg-surface-container-lowest text-on-surface">
                <h2 className="font-h2 text-h2 text-emerald-800 mb-4">Filtros de búsqueda</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Nombre del perro</label>
                        <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" placeholder="Ej: Firulais" name="nombre" value={filters.nombre} onChange={(e) => setFilters((prev) => ({ ...prev, nombre: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Raza</label>
                        <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" placeholder="Ej: Mestizo" name="raza" value={filters.raza} onChange={(e) => setFilters((prev) => ({ ...prev, raza: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Pelaje</label>
                        <input type="text" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium placeholder:text-on-surface-variant focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" placeholder="Ej: Corto" name="pelaje" value={filters.pelaje} onChange={(e) => setFilters((prev) => ({ ...prev, pelaje: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Fecha desde</label>
                        <input type="date" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" value={filters.fechaDesde} onChange={(e) => setFilters((prev) => ({ ...prev, fechaDesde: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Fecha hasta</label>
                        <input type="date" className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none shadow-sm" value={filters.fechaHasta} onChange={(e) => setFilters((prev) => ({ ...prev, fechaHasta: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Edad (Rango)</label>
                        <div className="flex gap-2">
                            <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface" value={filters.edadMin} onChange={(e) => setFilters((prev) => ({ ...prev, edadMin: e.target.value }))}>
                                <option value="">Mín</option>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} años</option>)}
                            </select>
                            <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface" value={filters.edadMax} onChange={(e) => setFilters((prev) => ({ ...prev, edadMax: e.target.value }))}>
                                <option value="">Máx</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15].map(n => <option key={n} value={n}>{n} años</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Sexo</label>
                        <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium" name="sexo" value={filters.sexo} onChange={(e) => setFilters((prev) => ({ ...prev, sexo: e.target.value }))}>
                            <option value="">Selecciona el sexo</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Tamaño</label>
                        <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium" name="tamaño" value={filters.tamaño} onChange={(e) => setFilters((prev) => ({ ...prev, tamaño: e.target.value }))}>
                            <option value="">Selecciona el tamaño</option>
                            <option value="Pequeño">Pequeño</option>
                            <option value="Mediano">Mediano</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>
                    {isAuthenticated && (
                    <div>
                        <label className="block text-sm mb-1 text-emerald-800 font-semibold">Estado</label>
                        <select className="w-full p-2 text-sm rounded-lg border border-outline-variant bg-white text-on-surface font-medium" name="estado" value={filters.estado} onChange={(e) => setFilters((prev) => ({ ...prev, estado: e.target.value }))}>
                            <option value="">Selecciona el estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="Adoptado">Adoptado</option>
                        </select>
                    </div>
                    )}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => { setFilters({ nombre: '', raza: '', pelaje: '', sexo: '', tamaño: '', estado: '', fechaDesde: '', fechaHasta: '', edadMin: '', edadMax: '' }); if (onApplyFilters) onApplyFilters({}); cerrarModalFiltros(); }} className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">Resetear</button>
                    <button onClick={cerrarModalFiltros} className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">Cerrar</button>
                    <button type="button" onClick={() => { const appliedFilters = {}; Object.entries(filters).forEach(([key, value]) => { if (value && value.toString().trim() !== '') appliedFilters[key] = value; }); if (onApplyFilters) onApplyFilters(appliedFilters); cerrarModalFiltros(); }} className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors text-sm font-medium">Filtrar</button>
                </div>
            </dialog>
        </>
    );
}