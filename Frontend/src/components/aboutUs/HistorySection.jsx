const HistorySection = () => (
    <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-green-50/50 rounded-2xl mt-8">
        <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 capitalize">
                Nuestra Historia
            </h2>
            <p className="leading-relaxed text-primary/90 text-md body-md">
                El <strong>Centro de Ayuda al Animal de Necochea</strong> es una organización sin fines de lucro que trabaja en la ciudad de Necochea, dedicada al rescate, cuidado y adopción responsable de animales en situación de abandono o riesgo. <br/><br/>
                Nuestra labor está centrada principalmente en <strong>perros</strong>, a quienes brindamos asistencia y recuperación con el objetivo de encontrarles un hogar definitivo.
            </p>
        </div>

        <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-200/60 rounded-xl transform translate-x-3 translate-y-3 -z-10"></div>
            <img
                src="./cartel.jpeg"
                alt="Historia del CAAN"
                className="bg-[#fcfbf9] p-3 pb-10 shadow-lg border border-stone-200/50 transform transition-all duration-500 group-hover:scale-100 group-hover:-rotate-2 rotate-1 rounded-sm"
            />
        </div>
    </div>
);

export default HistorySection;