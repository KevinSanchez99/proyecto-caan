import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const categories = ["Rescate", "Instalaciones", "Comunidad", "Salud", "Adopciones"];

const NewsHeader = ({ currentCategory, onCategoryChange, onSearch, currentDate, onDateChange }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
    
    <div className="flex flex-wrap gap-2 w-full md:w-auto">
      <button 
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-full border text-sm transition-colors whitespace-nowrap ${
          currentCategory === '' 
            ? "bg-surface text-primary border-primary font-bold" 
            : "bg-surface-container-lowest text-black border-outline-variant hover:bg-surface-container-low"
        }`}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button 
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full border text-sm transition-colors whitespace-nowrap ${
            currentCategory === cat 
              ? "bg-surface text-primary border-primary font-bold" 
              : "bg-surface-container-lowest text-black border-outline-variant hover:bg-surface-container-low"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      
      {/* Buscador por Fecha */}
      <div className="relative flex items-center w-full sm:w-auto grow">
        <input 
          type="date"
          value={currentDate}
          onChange={(e) => onDateChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none transition-all cursor-pointer text-sm ${currentDate ? 'pr-10' : ''}`}
        />
        {currentDate && (
          <button
            onClick={() => onDateChange('')}
            className="absolute right-3 text-outline hover:text-red-500 transition-colors flex items-center justify-center"
            title="Limpiar fecha"
            type="button"
          >
            <span className="text-2xl"><MdClose/></span>
          </button>
        )}
      </div>

      {/* Buscador de Texto */}
      <div className="relative w-full sm:w-64 grow">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"><FaSearch/></span>
        <input 
          className="w-full pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none transition-all text-sm"
          placeholder="Buscar por título..." 
          type="text" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default NewsHeader;