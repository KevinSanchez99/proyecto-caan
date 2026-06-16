import { IoPawSharp } from "react-icons/io5";
const FacilitiesSection = () => (
    <section className="flex flex-col items-center gap-8 p-8 md:p-12 bg-green-50/50 rounded-2xl mt-8 relative overflow-hidden">

        <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-2 text-center w-full">
            Este es Nuestro Predio
        </h2>

        {/* Contenedor de las 3 imágenes Polaroid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full relative z-10 px-4 mt-6">

            {/* Polaroid 1 */}
            <div className="relative group mx-auto w-full max-w-75">
                <div className="bg-[#fcfbf9] p-3 pb-10 shadow-lg border border-stone-200/50 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 rotate-1 rounded-sm">
                    <img src="./im1.jpeg" alt="Entrada al refugio" className="w-full aspect-square object-cover contrast-125" />
                </div>
            </div>

            {/* Polaroid 2 */}
            <div className="relative group mx-auto w-full max-w-75 md:-translate-y-6">
                <div className="bg-[#fcfbf9] p-3 pb-10 shadow-lg border border-stone-200/50 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 -rotate-1 rounded-sm">
                    <img src="./im2.jpeg" alt="Zonas de recreo" className="w-full aspect-square object-cover contrast-125" />
                </div>
            </div>

            {/* Polaroid 3 */}
            <div className="relative group mx-auto w-full max-w-75">
                <div className="bg-[#fcfbf9] p-3 pb-10 shadow-lg border border-stone-200/50 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 rotate-2 rounded-sm">
                    <img src="./mi3.jpeg" alt="Caniles limpios y seguros" className="w-full aspect-square object-cover contrast-125" />
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto text-justify relative z-10 mt-6">
            <p className="leading-relaxed text-primary text-lg font-semibold">
                Nuestro predio es el alma de nuestra misión. Un refugio seguro y lleno de amor para cientos de
                animales que esperan un hogar definitivo. Desde las amplias zonas de recreo hasta los recintos
                individuales diseñados para el bienestar de cada residente, cada espacio está pensado para su
                felicidad y sanación. Gracias a vuestro apoyo, este espacio es una realidad llena de esperanza.
            </p>

            <div className="flex justify-center gap-6 mt-8 opacity-30 text-primary">
                <span className="text-3xl transform -rotate-14"><IoPawSharp /></span>
                <span className="text-3xl translate-y-3"><IoPawSharp /></span>
                <span className="text-3xl transform rotate-12"><IoPawSharp /></span>
            </div>
        </div>
    </section>
);

export default FacilitiesSection;