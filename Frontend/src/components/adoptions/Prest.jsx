import React, { useState } from 'react';


export default function CabeceraAdopcion() {
  
  // (Aquí iría la lógica de tu useState si la necesitas más adelante)

  // 2. Usas return para mostrar el contenido
  return (
    // 3. Envuelves los elementos en un Fragmento (<> y </>) o un <div>
    <>
       <div class="max-w-container_max mx-auto px-gutter text-center">
            <h1 class="font-h1 text-h1 text-on-surface mb-sm">Encuentra a tu nuevo mejor amigo</h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Ellos están
                    esperando una segunda oportunidad. Conoce a nuestros increíbles animales listos para
                    llenar tu hogar de amor y alegría.</p>
                <img src="../../../public/animal21.jpeg" alt="" class="w-full h-auto mt-lg rounded-lg shadow-md object-cover"/>
        </div>
    </>
  );
}