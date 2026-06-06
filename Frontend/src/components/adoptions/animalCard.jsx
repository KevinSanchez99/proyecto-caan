import React from 'react';

export default function AnimalCard({ animal }) {
    return (
        
        <article className=" w-full bg-surface-dim flex flex-col p-md box-border">
            
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden w-full">
                <img 
                    alt={animal.nombre}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src={animal.imagenes} 
                />
            </div>

            <div className="p-md flex flex-col flex-grow">
                
                <div className="flex flex-row justify-between items-start mb-sm shrink-0">
                    <span className="font-h3 text-h3 text-on-surface">{animal.nombre}</span>

                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm text-[12px]">
                    {animal.raza}
                    </span>

                </div>
                
                <p className="font-body-md text-body-md text-on-surface-variant mb-2 shrink-0">
                    {animal.edad.valor} {animal.edad.unidad}
                </p>
                
                <p className="font-body-sm text-sm text-on-surface-variant line-clamp-4 break-all w-full mb-4">
                    {animal.descripcion}
                </p>
                
                
                <button className="w-3/4 mx-auto mt-auto py-3 border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary hover:text-on-primary transition-colors shrink-0">
                    Mas Informacion
                </button>
            </div>

        </article>
    );
}