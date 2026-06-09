import { useState } from "react";
import { Link } from "react-router-dom";


const OverlappingImagesSection = () => (
    <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-green-50/50 rounded-2xl max-w-6xl mx-auto mt-8">

        <div className="relative w-full max-w-[450px] mx-auto min-h-[380px] mt-8 mb-12 rounded-lg">
            <div className="absolute top-0 left-4 w-[260px] group z-10">
                <div className="bg-[#fcfbf9] p-3 pb-8 rounded shadow-xl border border-stone-200 transform rotate-3 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <img
                        src="./animal4.jpeg"
                        alt="Actividad en el refugio 1"
                        className="w-full aspect-square rounded-lg object-cover sepia-[0.15] contrast-125 brightness-95"
                    />
                </div>
            </div>

            <div className="absolute top-12 right-4 w-[260px] group z-20">
                <div className="bg-[#fcfbf9] p-3 pb-8 rounded shadow-2xl border border-stone-200 transform -rotate-3 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    <img
                        src="./animal2.jpeg"
                        alt="Actividad en el refugio 2"
                        className="w-full aspect-square rounded-lg object-cover sepia-[0.15] contrast-125 brightness-95"
                    />
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 capitalize">
                Nuestro Propósito
            </h2>
            <p className="leading-relaxed text-primary/80 text-md body-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium non, expedita ratione
                laudantium suscipit minus nesciunt facilis cupiditate error iusto eos, earum doloremque, tenetur
                quisquam veritatis placeat iure modi alias.
            </p>
        </div>

    </div>
);

export default OverlappingImagesSection;