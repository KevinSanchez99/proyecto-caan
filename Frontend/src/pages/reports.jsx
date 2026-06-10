import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { MdListAlt, MdPolicy, MdRoute, MdLocalPolice, MdMail, MdPrivacyTip, MdGroup } from 'react-icons/md';

export default function Reports() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col pt-20">
      <NavBar />

      <main className="max-w-4xl mx-auto px-gutter py-xl flex-grow w-full">
        
        {/* Cabecera */}
        <header className="mb-lg">
          <div className="inline-flex items-center space-x-2 bg-error-container text-on-error-container px-4 py-2 rounded-full mb-6 shadow-sm border border-error/20">
            <span className="text-2xl text-error"><MdPolicy/></span>
            <span className="font-label-sm text-label-sm font-bold tracking-wide uppercase">
              Asesoramiento Legal
            </span>
          </div>
          <h1 className="font-h1 text-h1 text-on-background mb-4">
            Cómo realizar una denuncia
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Desde CAAN no tomamos denuncias directas a través de esta página, pero te guiamos paso a paso para que sepas cómo proceder legalmente ante un caso de maltrato o abandono animal. Tu accionar correcto es fundamental para que la justicia pueda intervenir.
          </p>
        </header>

        <div className="space-y-8">
          
          {/* Vías de Denuncia */}
          <section className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 border border-outline-variant/20">
            <h2 className="font-h3 text-h3 text-on-background mb-6 flex items-center border-b border-surface-container-low pb-4">
              <span className="text-error mr-3 text-3xl"><MdRoute/></span>
              ¿Dónde realizar la denuncia?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary text-2xl"><MdLocalPolice/></span>
                  <h3 className="font-bold text-lg text-on-surface">Vía Presencial</h3>
                </div>
                <p className="text-on-surface-variant font-body-md">
                  Puedes acercarte a la comisaría más cercana al lugar de los hechos. Es tu derecho como ciudadano que te tomen la denuncia.
                </p>
              </div>
              <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary text-2xl"><MdMail/></span>
                  <h3 className="font-bold text-lg text-on-surface">Vía Correo Electrónico</h3>
                </div>
                <p className="text-on-surface-variant font-body-md mb-3">
                  Puedes enviar todos los datos probatorios directamente al correo electrónico de alguna comisaria.
                </p>
              </div>
            </div>
          </section>
            {/* Información Legal (Anonimato y Acompañante) */}
          <section className="bg-error-container/90 rounded-xl p-8 border border-error/20">
            <h2 className="font-h3 text-h3 text-error mb-6 flex items-center border-b border-error/20 pb-4">
              <span className="mr-3 text-3xl"><MdPrivacyTip/></span>
              Sobre el Anonimato y Participación
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-on-background mb-2 text-lg">Evolución de la denuncia</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed">
                  Si bien en una primera instancia <strong>la denuncia es anónima</strong> para protegerte, a medida que el proceso judicial avanza y se comprueba la veracidad de los hechos, por necesidad legal para su continuidad, <strong>dejará de ser anónima</strong> y la justicia podrá solicitar los datos del denunciante formal.
                </p>
              </div>

              <div className="bg-white/80 p-5 rounded-lg border border-error-container">
                <h3 className="font-bold text-on-background mb-2 flex items-center gap-2">
                  <span className="text-primary text-xl"><MdGroup/></span>
                  Figura del Acompañante / Testigo
                </h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed">
                  En caso de no querer figurar como el denunciante principal en la causa, tienes la opción de participar bajo la figura legal de <strong>acompañante</strong>. En este rol, serás únicamente el sujeto que confirma y testifica si aquello por lo cual se realiza la denuncia ocurrió o no, brindando apoyo a la causa sin ser el impulsor principal.
                </p>
              </div>
            </div>
          </section>

          {/* Requisitos de la Denuncia */}
          <section className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 border border-outline-variant/20">
            <h2 className="font-h3 text-h3 text-on-background mb-6 flex items-center border-b border-surface-container-low pb-4">
              <span className="text-error mr-3 text-3xl"><MdListAlt/></span>
              ¿Qué datos debe incluir la denuncia?
            </h2>
            <p className="text-on-surface-variant mb-6 font-body-md">
              Ya sea de forma presencial o por correo, para que la denuncia pueda avanzar legalmente, debe contener la mayor cantidad posible de la siguiente información:
            </p>
            
            <ul className="space-y-4 font-body-md text-on-surface">
              <li className="flex gap-4 items-start bg-surface-container-high p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center font-bold text-sm mt-0.5">1</span>
                <div>
                  <strong className="block mb-1">Relatar los hechos con detalles</strong>
                  <span className="text-on-surface-variant text-sm">Describe exactamente qué sucedió, cómo y en qué momento. Fechas y horarios son muy importantes.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start bg-surface-container-high p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center font-bold text-sm mt-0.5">2</span>
                <div>
                  <strong className="block mb-1">Adjuntar pruebas visuales</strong>
                  <span className="text-on-surface-variant text-sm">Fotos y videos claros que demuestren el maltrato o la situación en la que se encuentra el animal.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start bg-surface-container-high p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center font-bold text-sm mt-0.5">3</span>
                <div>
                  <strong className="block mb-1">Dirección del hecho</strong>
                  <span className="text-on-surface-variant text-sm">Ubicación exacta o referencias claras para que las autoridades puedan localizar el lugar.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start bg-surface-container-high p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center font-bold text-sm mt-0.5">4</span>
                <div>
                  <strong className="block mb-1">Datos del agresor</strong>
                  <span className="text-on-surface-variant text-sm">Nombre, apellido o cualquier dato identificatorio de la persona que está realizando el maltrato (si se conocen).</span>
                </div>
              </li>
              <li className="flex gap-4 items-start bg-surface-container-high p-4 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center font-bold text-sm mt-0.5">5</span>
                <div>
                  <strong className="block mb-1">Informe veterinario</strong>
                  <span className="text-on-surface-variant text-sm">Detallar en qué estado físico y de salud se vio al animal en los últimos días antes de realizar la denuncia.</span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}