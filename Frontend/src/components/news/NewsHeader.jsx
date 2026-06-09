const categories = ["Rescate", "Instalaciones", "Comunidad", "Salud", "Adopciones"];

const NewsHeader = ({ currentCategory, onCategoryChange, onSearch, currentDate, onDateChange }) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
    {/* Filtro de Categorías */}
    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
      <button 
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${currentCategory === '' ? "bg-emerald-700 text-white border-emerald-700" : "border-outline-variant hover:bg-surface-container-high"}`}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button 
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${currentCategory === cat ? "bg-emerald-700 text-white border-emerald-700" : "border-outline-variant hover:bg-surface-container-high"}`}
        >
          {cat}
        </button>
      ))}
    </div>

    <div className="flex gap-3 w-full md:w-auto">
      {/* Buscador por Fecha con botón de limpiar */}
      <div className="relative flex items-center w-full md:w-auto">
        <input 
          type="date"
          value={currentDate}
          onChange={(e) => onDateChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none transition-all cursor-pointer text-sm ${currentDate ? 'pr-10' : ''}`}
        />
        {/* Este botón solo aparece si currentDate tiene algún valor */}
        {currentDate && (
          <button
            onClick={() => onDateChange('')}
            className="absolute right-3 text-outline hover:text-red-500 transition-colors flex items-center justify-center"
            title="Limpiar fecha"
            type="button"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        )}
      </div>

      {/* Buscador de Texto */}
      <div className="relative w-full md:w-64">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input 
          className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none transition-all"
          placeholder="Buscar por título..." 
          type="text" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default NewsHeader;