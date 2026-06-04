import React, { useState } from 'react';

const Hero = () => (
    <section className="relative bg-surface-container-low overflow-hidden">
        <div className="max-w-[93%] mx-auto px-gutter py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10">

            <div className="flex-1 space-y-6 z-10 text-center lg:text-left">
                <h1 className="inline-block px-4 py-2 bg-primary-container text-white font-label-2xl text-label-2xl rounded-full mb-4">
                    Centro de Ayuda al Animal de Necochea
                </h1>

                <h2 className="font-h1 text-[40px] md:text-[50px] text-on-surface leading-tight">
                    Dale un hogar a quien más lo necesita
                </h2>

                <p className="font-body-lg text-body-lg text-on-surface-variant mx-auto">
                    Rescatamos, rehabilitamos y buscamos familias amorosas para animales en situación de calle.<br/>Conoce a tu nuevo mejor amigo o ayúdanos a seguir cambiando vidas.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                    <a href="/adopciones" className="bg-secondary text-on-secondary border border-outline-variant font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-secondary/85 transition-all text-center">
                        Adoptar ahora
                    </a>
                    <a href="/donaciones" className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-sm text-center">
                        Hacer una donación
                    </a>
                </div>
            </div>

            <div className="flex-1 relative z-10 w-full h-[400px] md:h-[500px]">
                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perro feliz al aire libre" className="w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>

        </div>
    </section>
);

export default Hero;