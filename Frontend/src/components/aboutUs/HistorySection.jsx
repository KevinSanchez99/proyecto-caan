import { useState } from "react";
import {Link} from "react-router-dom";

const HistorySection = () => (
    <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-green-50/50 rounded-2xl max-w-6xl mx-auto mt-8">
        <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 capitalize">
                Nuestra Historia
            </h2>
            <p className="leading-relaxed text-primary/80 text-md body-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium non, expedita ratione
                laudantium suscipit minus nesciunt facilis cupiditate error iusto eos, earum doloremque, tenetur
                quisquam veritatis placeat iure modi alias.
            </p>
        </div>

        <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-200/60 rounded-xl transform translate-x-3 translate-y-3 -z-10"></div>
            {/* Asegúrate de que la ruta de la imagen sea correcta (ej. /images/cartel.jpeg o importada) */}
            <img
                src="./cartel.jpeg"
                alt="Historia del CAAN"
                className="bg-[#fcfbf9] p-3 pb-10 shadow-lg border border-stone-200/50 transform transition-all duration-500 group-hover:scale-100 group-hover:-rotate-2 rotate-1 rounded-sm"
            />
        </div>
    </div>
);

export default HistorySection;