import {useRef}from 'react';

export default function FilterDog() {
    // 1. Creamos la referencia para el dialog
        const modalRef = useRef(null);

        // 2. Funciones para controlar la apertura y cierre
        const abrirModal = () => {
            if (modalRef.current) modalRef.current.showModal();
        };

        const cerrarModal = () => {
            if (modalRef.current) modalRef.current.close();
        };

    return (
        <>
        <div className="flex items-center gap-sm w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                            data-icon="search">search</span>
                    <input className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md placeholder-outline"
                            placeholder="Buscar por nombre..." type="text" />
                </div>

                <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant">
                    Buscar
                </button>

                <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant" onClick={abrirModal}>
                    Nuevo 
                </button>
        </div>

        <dialog 
                ref={modalRef} 
                className="p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%]  bg-surface-container-lowest text-on-surface"
            >
                <h3 className="text-xl font-semibold mb-5">Ingresar Nuevo Rescatado</h3>
                
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Nombre del perro</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Firulais" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Edad aproximada</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: 2 años" 
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                        {/* El tipo "button" evita que el formulario recargue la página */}
                        <button 
                            type="button" 
                            onClick={cerrarModal}
                            className="px-5 py-2.5 rounded-full font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button"
                            onClick={cerrarModal}
                            className="px-5 py-2.5 rounded-full font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity"
                        >
                            Crear Ficha
                        </button>
                    </div>
                </form>
            </dialog>
            </>
);
}
