
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