import{ useState } from "react";
import { Link } from "react-router-dom";

const FacilitiesSection = () => (
    <section className="max-w-[1280px] mx-auto px-8 py-16 mt-12 bg-[#f4f1ea] dark:bg-stone-900 rounded-sm shadow-inner relative overflow-hidden border border-stone-200/50">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-14 tracking-widest uppercase font-serif">
            Este es nuestro predio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14 relative z-10 px-4">
            <div className="relative group mx-auto w-full max-w-[320px]">
                <div className="bg-[#fcfbf9] p-3 shadow-md transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    <img src="./im1.jpeg" alt="Entrada al refugio" className="w-full aspect-square object-cover contrast-125 border border-stone-200" />
                </div>
            </div>

            <div className="relative group mx-auto w-full max-w-[320px] mt-4 md:mt-0">
                <div className="bg-[#fcfbf9] p-3 shadow-md transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <img src="./im2.jpeg" alt="Zonas de recreo" className="w-full aspect-square object-cover contrast-125 border border-stone-200" />
                </div>
            </div>

            <div className="relative group mx-auto w-full max-w-[320px] mt-4 md:mt-0">
                <div className="bg-[#fcfbf9] p-3 shadow-md transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    <img src="./mi3.jpeg" alt="Caniles limpios y seguros" className="w-full aspect-square object-cover contrast-125 border border-stone-200" />
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-stone-800 dark:text-stone-300 text-lg md:text-xl leading-relaxed font-medium font-serif">
                Nuestro predio es el alma de nuestra misión. Un refugio seguro y lleno de amor para cientos de
                animales que esperan un hogar definitivo. Desde las amplias zonas de recreo hasta los recintos
                individuales diseñados para el bienestar de cada residente, cada espacio está pensado para su
                felicidad y sanación. Gracias a vuestro apoyo, este espacio es una realidad llena de esperanza.
            </p>

            <div className="flex justify-center gap-6 mt-8 opacity-30 text-stone-800 dark:text-stone-300">
                <span className="material-symbols-outlined text-4xl transform -rotate-12">pets</span>
                <span className="material-symbols-outlined text-4xl translate-y-3">pets</span>
                <span className="material-symbols-outlined text-4xl transform rotate-12">pets</span>
            </div>
        </div>
    </section>
);

export default FacilitiesSection;