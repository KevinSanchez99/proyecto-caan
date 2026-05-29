import React from 'react';

export default function AnimalCard() {
    return (
        
        <article className=" w-3xl bg-surface-dim flex flex-col p-md box-border">
            
            <div className="relative h-60 shrink-0 overflow-hidden w-full">
                <img 
                    alt="Luna"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/animal.jpeg" 
                />
            </div>

            <div className="p-md flex flex-col flex-grow">
                
                <div className="flex justify-between items-start mb-sm shrink-0">
                    <h3 className="font-h3 text-h3 text-on-surface">Luna</h3>
                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm text-[12px]">
                        Cachorro
                    </span>
                </div>
                
                <p className="font-body-md text-body-md text-on-surface-variant mb-2 shrink-0">
                    Golden Retriever Mix • Hembra • 6 meses
                </p>
                
                <p className="font-body-sm text-sm text-on-surface-variant mx-auto line-clamp-4 overflow-hidden">
                    Luna es una perrita muy dulce y enérgica. Le encanta correr por el parque, jugar con la pelota y recibir muchos mimos. Es ideal para una familia activa que disfrute de los paseos largos.
                </p>
                
                <button className="w-3/4 mx-auto mt-auto py-3 border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary hover:text-on-primary transition-colors shrink-0">
                    Conocer a Luna
                </button>
            </div>

        </article>
    );
}