import { useState, useEffect } from 'react';
import FaqAccordionItem from '../components/faq/AcordionItems';
import FaqCard from '../components/faq/FaqCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { MdPets, MdVolunteerActivism, MdFavorite, MdLocationOn } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function Faq() {
  // --- 1. LÓGICA DEL SCROLLSPY (Observador de secciones) ---
  const [activeSection, setActiveSection] = useState('adopcion');

  useEffect(() => {
      const observerOptions = {
          root: null,
          rootMargin: '-20% 0px -70% 0px', 
          threshold: 0
      };

      const observerCallback = (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  setActiveSection(entry.target.id);
              }
          });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Vigila estos IDs exactos
      const sectionIds = ['adopcion', 'voluntariado', 'donaciones', 'ubicacion'];
      sectionIds.forEach((id) => {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
      });

      return () => observer.disconnect();
  }, []);

  // --- 2. DATOS DEL MENÚ LATERAL ---
  const navLinks = [
      { id: 'adopcion', label: 'Proceso de Adopción', icon: <MdPets /> },
      { id: 'voluntariado', label: 'Voluntariado', icon: <MdVolunteerActivism /> },
      { id: 'donaciones', label: 'Donaciones', icon: <MdFavorite /> },
      { id: 'ubicacion', label: 'Ubicación', icon: <MdLocationOn /> },
  ];

  // --- 3. RENDERIZADO DE LA PÁGINA ---
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <NavBar />

      <main className="grow pt-24 pb-xl">
        {/* Encabezado */}
        <section className="max-w-container_max mx-auto px-8 py-lg text-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-md">Preguntas Frecuentes</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre nuestro proceso de adopción, voluntariado y cómo puedes ayudar a los animales del CAAN.
          </p>
        </section>

        {/* Grilla Principal */}
        <section className="max-w-container_max mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          
          {/* --- MENÚ LATERAL (ASIDE) --- */}
          <aside className="md:col-span-3 relative md:sticky md:top-32 space-y-sm">
            <nav className="bg-surface-container-lowest rounded-xl p-md shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col gap-sm border border-outline-variant/30">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                        <a 
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={() => setActiveSection(link.id)} 
                            className={`flex items-center gap-sm font-label-sm text-label-sm p-sm rounded-lg transition-all duration-300 ${
                                isActive 
                                    ? "text-primary bg-surface-container-low shadow-sm font-bold scale-[1.02]" 
                                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest"
                            }`}
                        >
                            <span className="text-2xl">{link.icon}</span>
                            {link.label}
                        </a>
                    );
                })}
            </nav>

            {/* Tarjeta de Contacto Mini */}
            <div className="bg-primary-container text-on-primary-container rounded-xl p-md shadow-[0_15px_30px_rgba(45,106,79,0.1)]">
              <h3 className="font-label-sm text-label-sm mb-sm uppercase tracking-wider opacity-80">
                ¿Aún tienes dudas?
              </h3>
              <p className="font-body-md text-sm mb-md opacity-90">
                Nuestro equipo está listo para ayudarte con cualquier pregunta adicional.
              </p>
              <a className="inline-flex items-center gap-xs font-label-sm text-label-sm bg-on-primary-container text-primary-container px-4 py-2 rounded-full hover:bg-white transition-colors" href="https://www.instagram.com/caanecochea/" target="_blank">
                Contáctanos
                <span className="text-[18px]" ><IoMdArrowRoundForward /></span>
              </a>
            </div>
          </aside>

          {/* --- CONTENIDO DE LAS PREGUNTAS --- */}
          <div className="md:col-span-9 space-y-xl">
            
            {/* Sección: Adopción */}
            <div className="scroll-mt-32" id="adopcion">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="text-primary text-3xl"><MdPets/></span>
                <h2 className="font-h2 text-h2 text-primary">Proceso de Adopción</h2>
              </div>
              <div className="space-y-md">
                <FaqAccordionItem question="¿Cuáles son los requisitos básicos para adoptar?" defaultOpen={true}>
                  <h3 className="text-black font-semibold">Para adoptar en el CAAN necesitas:</h3>
                  <ul className="list-disc pl-md mt-sm space-y-xs text-black">
                    <li>Ser mayor de 21 años.</li>
                    <li>Presentar identificación oficial y comprobante de domicilio.</li>
                    <li>Llenar el formulario de solicitud de adopción.</li>
                    <li>Pasar una entrevista con nuestro equipo de adopciones.</li>
                    <li>Estar de acuerdo con el seguimiento post-adopción.</li>
                  </ul>
                </FaqAccordionItem>

                <FaqAccordionItem question="¿La adopción tiene algún costo?">
                  <p className="text-black">Sí, solicitamos una cuota de recuperación. Esta cuota nos ayuda a cubrir una parte de los gastos médicos que el animal ha recibido mientras estuvo a nuestro cuidado.</p>
                </FaqAccordionItem>
              </div>
            </div>

            {/* Sección: Voluntariado */}
            <div className="scroll-mt-32" id="voluntariado">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-primary text-3xl"><MdVolunteerActivism/></span>
                <h2 className="font-h2 text-h2 text-primary">Voluntariado</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-black">
                <FaqCard 
                  title="¿Cómo puedo ser voluntario?"
                  description="Para ser voluntario debes asistir a una de nuestras sesiones informativas mensuales. Anunciamos las fechas en nuestras redes sociales y sitio web."
                />
                <FaqCard 
                  title="¿Qué actividades realizan los voluntarios?"
                  description="Los voluntarios pueden ayudar paseando perros, socializando con ellos, apoyando en eventos de adopción, o ayudando en labores del refugio."
                />
              </div>
            </div>

            {/* Sección: Donaciones */}
            <div className="scroll-mt-32" id="donaciones">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-primary text-3xl"><MdFavorite/></span>
                <h2 className="font-h2 text-h2 text-primary">Donaciones</h2>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm text-on-surface-variant">
                <p>Como donación no solo aceptamos dinero. Tambien aceptamos donaciones de alimento, ropa de abrigo y Materiales de Construcción. Si desean realizar una donación presencial acuerdense de avisarnos y un asociado se acercara a recibirlo. ¡Toda ayuda cuenta para seguir rescatando!</p>
              </div>
            </div>

            {/* Sección: Ubicación (Mapa) */}
            <div className="scroll-mt-32 pb-12" id="ubicacion">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="text-primary text-3xl"><MdLocationOn/></span>
                <h2 className="font-h2 text-h2 text-primary">Ubicación</h2>
              </div>
              
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
                <div className="text-on-surface-variant font-body-md">
                  <p>Nos encontramos en Necochea, Provincia de Buenos Aires. ¡Te esperamos para que conozcas a nuestros rescatados!</p>
                  <p className="font-bold text-primary mt-2">Dirección: Calle 107 Esquina 66, Necochea, BA.</p>
                </div>
                {/* Mapa Responsivo */}
                <div className="w-full h-87.5 md:h-112.5 rounded-xl overflow-hidden border border-outline-variant/30 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.438311416452!2d-58.76915112465223!3d-38.56975317762067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x958fbd3dd2c3bc67%3A0xf38c8259a2a91cb8!2sProtectora%20De%20Animales%20Caan%20Necochea!5e0!3m2!1ses-419!2sar!4v1781903210617!5m2!1ses-419!2sar"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación CAAN Necochea"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};