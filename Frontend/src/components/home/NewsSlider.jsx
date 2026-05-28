import React, { useState } from 'react';
const NewsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    return (
        <section className="mb-lg mt-lg relative w-[95%] md:w-[75%] lg:w-[83%] mx-auto overflow-hidden bg-white shadow-sm border border-outline-variant/20 rounded-xl">
            <div
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {/* Slide 1 */}
                <article className="w-full flex-shrink-0 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-64 md:h-[350px] lg:h-[400px] relative overflow-hidden">
                        <img alt="Gatito recién rescatado" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwMrTlVsdeH3XtY0W76smRzG2FCYHG-A01v1hiGQ--BFfLOaHqGtKvEJ0BaQCeBwV5X-qHCbcjUUlInKAwdSAVFGqUJrRZoJP5iCpUysx08hoWaQD3nu7mnqJvNS86oUfGf6sRw0YmO3p9MDydsELLIooX-e3ZJCt0obZXsPEMHBAzUQ5Gp4upLG7yrXpVM_e3aPR9HOxCFLodtercdj49BGj1xXKTohc-FyNm0T8DsK6mK3RBZZcXOjcBs4VBrKYhu2WOBuiLW7KO" />
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur text-stone-800 font-semibold px-3 py-1 rounded-md text-xs shadow">Rescate</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-stone-50">
                        <div className="text-stone-500 font-semibold text-sm mb-3">15 Octubre, 2025</div>
                        <h3 className="text-2xl md:text-3xl text-emerald-800 font-bold mb-3 leading-tight">Rescatamos a 5 gatitos abandonados en el centro</h3>
                        <p className="text-base text-stone-600 mb-6 line-clamp-4 w-[70%]">Gracias al aviso rápido de la comunidad, pudimos rescatar a esta camada antes de la tormenta. Ya están recibiendo cuidados veterinarios.</p>
                        <a href="#" className="text-emerald-700 font-semibold hover:underline mt-auto md:mt-0">Leer noticia completa</a>
                    </div>
                </article>

                {/* Slide 2 */}
                <article className="w-full flex-shrink-0 flex flex-col md:flex-row-reverse">
                    <div className="w-full md:w-1/2 h-64 md:h-[350px] lg:h-[400px] relative overflow-hidden">
                        <img alt="Nuevo centro de juegos" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxKRakfasxoMGhmcBgzDfYJ_lbaNg2Tit7sSfytdLIRfGrN7PodAoX4RozksxQQq8AJ6VVuA96soc1c5cyUUSDa4XJE8SOg9ABgCxRw1fUCRqqdvlnwdJduuuw8e4MM6O6oAD1FnX3b6l8bf8DYTGWAzmkcPosHAvJR6mtWxFLqAtjZnn518ak2ghN33_WtMA_WLoAlr6oUqqBqhTmwk5TplaDY2tk0ZshV2V4lAXEwS0ZUVTsgn9AuGSDcQvZf4v4APGX8VOU5eKb" />
                        <div className="absolute top-4 right-4 md:left-4 md:right-auto">
                            <span className="bg-white/90 backdrop-blur text-stone-800 font-semibold px-3 py-1 rounded-md text-xs shadow">Instalaciones</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-stone-50">
                        <div className="text-stone-500 font-semibold text-sm mb-3">10 Octubre, 2025</div>
                        <h3 className="text-2xl md:text-3xl text-emerald-800 font-bold mb-3 leading-tight">¡Inauguramos nuestra nueva área de juegos!</h3>
                        <p className="text-base text-stone-600 mb-6 line-clamp-4 w-[70%]">Gracias a sus donaciones, hemos completado la construcción del patio techado para días de lluvia. Los animales ya lo están disfrutando.</p>
                        <a href="#" className="text-emerald-700 font-semibold hover:underline mt-auto md:mt-0">Leer noticia completa</a>
                    </div>
                </article>

                {/* Slide 3 */}
                <article className="w-full flex-shrink-0 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-64 md:h-[350px] lg:h-[400px] relative overflow-hidden">
                        <img alt="Voluntarios" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdz9bKCRWUgXDGhmyls0FN2f_q23hRv2MwleeUVPV7vEAshTohsyV3yl6Fod-D70ABAHp5Kv92Hm0ZE2xo_3Ybgo7-wmoUaYReHjn38EGWAHt-Ps5vv5yR5qVSo69wPFDUATjMydtIEDBKKoSe_kLmGetxmqmLnfDJvo5hVa2EMUBhil5mWtJhZYSOEj5gPfadLVBqD5iwXCnBXrW9roUCckjIL8gBLWD_rzv8MfcZf1guToqF-MaP_TFtRr2EXpGGLDuIua1AJ0hO" />
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur text-stone-800 font-semibold px-3 py-1 rounded-md text-xs shadow">Comunidad</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-stone-50">
                        <div className="text-stone-500 font-semibold text-sm mb-3">05 Octubre, 2025</div>
                        <h3 className="text-2xl md:text-3xl text-emerald-800 font-bold mb-3 leading-tight">Programa de Voluntariado 2025: Inscripciones</h3>
                        <p className="text-base text-stone-600 mb-6 line-clamp-4 w-[70%]">Buscamos personas apasionadas por el bienestar animal para unirse a nuestro equipo el próximo año. ¡Súmate a la causa!</p>
                        <a href="#" className="text-emerald-700 font-semibold hover:underline mt-auto md:mt-0">Leer noticia completa</a>
                    </div>
                </article>
            </div>

            <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex justify-center items-center bg-white/90 hover:bg-white rounded-full shadow-lg border border-gray-200 text-gray-800 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex justify-center items-center bg-white/90 hover:bg-white rounded-full shadow-lg border border-gray-200 text-gray-800 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
        </section>
    );
};

export default NewsSlider;