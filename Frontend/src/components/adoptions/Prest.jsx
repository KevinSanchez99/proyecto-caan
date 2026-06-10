import React from 'react';
import { FaPaw } from 'react-icons/fa';

export default function CabeceraAdopcion() {
  
  // (Aquí iría la lógica de tu useState si la necesitas más adelante)

  return (
    <>
      <div className="max-w-container_max mx-auto px-gutter text-center mt-12 mb-20">
            <h1 className="font-h1 text-h1 text-on-surface mb-sm">¡No compres, adoptá!</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                  La adopción es un acto de amor. Enseñale a tus hijos a valorar la vida, a respetar, cuidar y responsabilizarse de un ser que lo amará incondicionalmente toda su vida, y luego de ella. Ayudanos a luchar contra el abandono.
                </p>
                <div className="flex flex-col md:flex-row gap-6 mt-lg py-6 justify-center items-center">
                  <div className="relative bg-white p-4 rounded-md shadow-lg w-80 sm:w-96 md:w-112">
                    <img src="../../../public/adopta1.jpg" alt="Perros jugando" className="w-full h-72 object-cover rounded-sm block" />
                  </div>
                  <div className="relative bg-white p-4 rounded-md shadow-lg w-80 sm:w-96 md:w-112">
                    <img src="../../../public/adopta2.jpg" alt="Perros jugando" className="w-full h-72 object-cover rounded-sm block" />
                  </div>
                  <div className="relative bg-white p-4 rounded-md shadow-lg w-80 sm:w-96 md:w-112">
                    <img src="../../../public/adopta3.jpg" alt="Perros jugando" className="w-full h-72 object-cover rounded-sm block" />
                  </div>
                </div>
        </div>
    </>
  );
}