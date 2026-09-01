const OverlappingImagesSection = () => (
    <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-green-50/50 rounded-2xl mt-8">

        <div className="relative w-full max-w-112.5 mx-auto min-h-95 mt-8 mb-12 rounded-lg">
            <div className="absolute top-0 left-4 w-65 group z-10">
                <div className="bg-[#fcfbf9] p-3 pb-8 rounded shadow-xl border border-stone-200 transform rotate-3 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <img
                        src="./animal4.jpeg"
                        alt="Actividad en el refugio 1"
                        className="w-full aspect-square rounded-lg object-cover sepia-[0.15] contrast-125 brightness-95"
                    />
                </div>
            </div>

            <div className="absolute top-12 right-4 w-65 group z-20">
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
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 capitalize">
                Nuestro Propósito
            </h2>
            <p className="leading-relaxed text-primary/80 text-md body-md">
                Cada rescate, cada castración y cada adopción es un paso hacia una comunidad más consciente y responsable con los animales.<br/> Junto a la comunidad del CAAN creemos que el bienestar animal se construye entre todos: con quienes adoptan, quienes donan, quienes dedican su tiempo como voluntarios y quienes simplemente eligen informarse y respetar a los animales de nuestra ciudad.
            </p>
        </div>

    </div>
);

export default OverlappingImagesSection;