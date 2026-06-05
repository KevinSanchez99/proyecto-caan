import React from 'react';
import {Link} from 'react-router-dom';


const NewsHeader = () => (
  <div className="flex justify-end items-end mb-8">
    <div className="flex items-center gap-sm w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>
          search
        </span>
        <input 
          className="w-full flex flex-end pl-10 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md placeholder-outline"
          placeholder="Buscar por nombre..." 
          type="text" 
        />
      </div>
      <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          tune
        </span>
      </button>
    </div>
  </div>
);

export default NewsHeader;