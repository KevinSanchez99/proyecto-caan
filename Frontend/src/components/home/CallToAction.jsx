import {MdFavorite} from 'react-icons/md';

const CallToAction = () => (
    <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[93%] mx-auto px-6">
            <div className="bg-emerald-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-sm">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500 opacity-30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-300 opacity-20 rounded-full blur-3xl"></div>

                <div className="relative z-10 md:w-1/2 text-emerald-50 text-center md:text-left">
                    <h2 className="font-bold text-[32px] md:text-[40px] mb-4">¿No puedes adoptar hoy?</h2>
                    <p className="text-lg mb-8 opacity-90">Tu aporte económico nos permite comprar alimento, medicinas y pagar cirugías de emergencia para animales rescatados en condiciones críticas.</p>
                    <a href="/donations" className="inline-flex bg-white text-emerald-900 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 active:scale-95 transition-all items-center gap-2">
                        <span className="text-xl"><MdFavorite/></span> Haz una donación
                    </a>
                </div>
                <div className="relative w-70% md:w-1/2 h-full md:h-auto ">
                    <img src="/animal4.jpeg" alt="Perros siendo cuidados" className="w-full aspect-square md:aspect-4/3 object-cover rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500" />
                </div>
            </div>
        </div>
    </section>
);

export default CallToAction;