import { useRef, useEffect } from "react";

export default function FilterAnimal() {
    const modalRef = useRef(null);

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
            <div className="flex flex-row items-center gap-4">
                

                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                            data-icon="search">search</span>
                    <input className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md placeholder-outline"
                            placeholder="Buscar por ..." type="text" />
                </div>

                <button
                        type="button"
                        aria-label="Más opciones"
                        onClick={abrirModalFiltros}
                        className="p-2 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant"
                >
                        <span className="material-symbols-outlined">more_vert</span>
                        <span className="sr-only">Más opciones</span>
                </button>
            </div>

            <dialog ref={modalRef} className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface">
                <h2 className="font-h2 text-h2 mb-4">Filtros de búsqueda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    
                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Nombre del perro</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Firulais"
                            name="nombre" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Raza</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Mestizo" 
                            name="raza"
                            required
                        />
                    </div>

                                <div>
                                    <label className="block text-sm mb-1 text-on-surface-variant">Pelaje</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                                        placeholder="Ej: Mestizo" 
                                        name="pelaje"
                                        required
                                    />
                                </div>

                                <div>
                                <label className="block text-sm mb-1 text-on-surface-variant">Sexo</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="sexo" required>
                                    <option value="">Selecciona el sexo</option>
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-on-surface-variant">Tamaño</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="tamaño" required>
                                    <option value="">Selecciona el tamaño</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                <label className="block text-sm mb-1 text-on-surface-variant">Edad aproximada</label>
                                    <input 
                                        type="text" 
                                        inputMode="numeric" 
                                        pattern="[0-9]*"
                                        className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                                        placeholder="Ej: 2" 
                                        name="edad"
                                        required
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                                    />
                                </div>

                                <div>
                                    <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="unidad_edad" required>
                                        <option value=""> Unidad</option>
                                        <option value="meses">Meses</option>
                                        <option value="años">Años</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={cerrarModalFiltros}
                        className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                        Cerrar
                    </button>
                    <button 
                        className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-medium"
                    >
                        Filtrar
                    </button>
                </div>
            </dialog>
    </>
  );
}


