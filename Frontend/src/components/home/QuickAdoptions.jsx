import React, { useState } from 'react';
const QuickAdoptions = () => (
    <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-stone-900 mb-2">Esperan por ti</h2>
                    <p className="text-stone-600">Conoce a algunos de nuestros peludos listos para ir a casa.</p>
                </div>
                <a href="/adopciones" className="hidden sm:flex font-semibold text-emerald-700 hover:text-emerald-900 transition-colors items-center gap-1">
                    Ver todos <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: 'Luna', type: 'Cachorro', desc: 'Golden Retriever Mix • Hembra', img: 'https://www.catalunyaplants.com/wp-content/uploads/2015/01/golden-retriever.jpg' },
                    { name: 'Simba', type: 'Adulto', desc: 'Mestizo • Macho', img: 'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/f1787514-7f19-4732-88e7-c2842b8cbf61/ron%20%282%29.jpg?w=1920&q=75&auto=format' },
                    { name: 'Max', type: 'Adulto', desc: 'Pastor Mix • Macho', img: 'https://www.publicdomainpictures.net/pictures/380000/velka/hund-mix-schaferhund-niedlich.jpg', hiddenOnMobile: true }
                ].map((animal, idx) => (
                    <article key={idx} className={`bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 ${animal.hiddenOnMobile ? 'hidden md:block' : ''}`}>
                        <div className="h-56 overflow-hidden">
                            <img src={animal.img} alt={animal.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-[20px] font-bold text-stone-900">{animal.name}</h3>
                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[12px] font-semibold">{animal.type}</span>
                            </div>
                            <p className="text-sm text-stone-600 mb-4">{animal.desc}</p>
                            <a href="/adopciones" className="block text-center w-full py-2 border border-emerald-800 text-emerald-800 font-semibold rounded-full hover:bg-emerald-800 hover:text-white transition-colors">Conocer a {animal.name}</a>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
                <a href="/adopciones" className="inline-flex bg-stone-200 text-stone-900 font-semibold px-6 py-3 rounded-full">Ver todos los animales</a>
            </div>
        </div>
    </section>
);

export default QuickAdoptions;