import { useState, useEffect } from "react";
const Hero = () => {
    // Arreglo de imágenes para el slider
    const images = [
        "../../public/slider1.jpg",
        "../../public/slider2.jpg",
        "../../public/slider3.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Efecto para cambiar la imagen automáticamente
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambia cada 5 segundos

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative text-on-background overflow-hidden">
            <div className="mx-auto py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10">

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
                        <a href="/adoptions" className="bg-secondary-container text-on-secondary border border-outline-variant font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-secondary-container/70 transition-all text-center">
                            Adoptar ahora
                        </a>
                        <a href="/donations" className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-sm text-center">
                            Hacer una donación
                        </a>
                    </div>
                </div>

                {/* Contenedor del Slider */}
                <div className="flex-1 relative z-10 w-full h-100 md:h-125 rounded-2xl overflow-hidden shadow-xl group">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Animal rescatado ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    ))}
                    
                    {/* Indicadores (Dots) */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                    ? "bg-white scale-125" 
                                    : "bg-white/50 hover:bg-white/80"
                                }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;