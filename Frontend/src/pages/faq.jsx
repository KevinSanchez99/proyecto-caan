import React from 'react';
import FaqAccordionItem from '../components/faq/AcordionItems';
import VoluntariadoCard from '../components/faq/VoluntariadoCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { MdPets, MdVolunteerActivism, MdFavorite, MdHelp} from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function Faq() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-24 pb-xl">
        {/* Header Section */}
        <section className="max-w-container_max mx-auto px-8 py-lg text-center">
          <h1 className="font-h1 text-h1 text-primary mb-md">Preguntas Frecuentes</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre nuestro proceso de adopción, voluntariado y cómo puedes ayudar a los animales del CAAN.
          </p>
        </section>

        {/* FAQ Content Grid */}
        <section className="max-w-container_max mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          
          {/* Sidebar Navigation */}
          <aside className="md:col-span-3 relative md:sticky md:top-32 space-y-sm">
            <nav className="bg-surface-container-lowest rounded-xl p-md shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col gap-sm border border-outline-variant/30">
              <a className="flex items-center gap-sm text-primary font-label-sm text-label-sm p-sm bg-surface-container-low rounded-lg transition-colors" href="#adopcion">
                <span className="text-2xl"><MdPets/></span>
                Proceso de Adopción
              </a>
              <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary font-label-sm text-label-sm p-sm hover:bg-surface-container-low rounded-lg transition-colors" href="#voluntariado">
                <span className="text-2xl"><MdVolunteerActivism/></span>
                Voluntariado
              </a>
              <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary font-label-sm text-label-sm p-sm hover:bg-surface-container-low rounded-lg transition-colors" href="#donaciones">
                <span className="text-2xl"><MdFavorite/></span>
                Donaciones
              </a>
              <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary font-label-sm text-label-sm p-sm hover:bg-surface-container-low rounded-lg transition-colors" href="#general">
                <span className="text-2xl"><MdHelp/></span>
                General
              </a>
            </nav>

            {/* Contact Card Mini */}
            <div className="bg-primary-container text-on-primary-container rounded-xl p-md shadow-[0_15px_30px_rgba(45,106,79,0.1)]">
              <h3 className="font-label-sm text-label-sm mb-sm uppercase tracking-wider opacity-80">
                ¿Aún tienes dudas?
              </h3>
              <p className="font-body-md text-sm mb-md opacity-90">
                Nuestro equipo está listo para ayudarte con cualquier pregunta adicional.
              </p>
              <a className="inline-flex items-center gap-xs font-label-sm text-label-sm bg-on-primary-container text-primary-container px-4 py-2 rounded-full hover:bg-white transition-colors" href="/contacto">
                Contáctanos
                <span className="text-[18px]"><IoMdArrowRoundForward/></span>
              </a>
            </div>
          </aside>

          {/* FAQ Lists */}
          <div className="md:col-span-9 space-y-xl">
            
            {/* Adopcion Section */}
            <div className="scroll-mt-32" id="adopcion">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="text-primary text-3xl"><MdPets/></span>
                <h2 className="font-h2 text-h2 text-primary">Proceso de Adopción</h2>
              </div>
              <div className="space-y-md">
                
                <FaqAccordionItem 
                  question="¿Cuáles son los requisitos básicos para adoptar?" 
                  defaultOpen={true}>
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
                  <p className="text-black">Sí, solicitamos una cuota de recuperación. Esta cuota nos ayuda a cubrir una parte de los gastos médicos que el animal ha recibido mientras estuvo a nuestro cuidado, incluyendo: esterilización, castración, vacunas al día, desparasitación.</p>
                </FaqAccordionItem>

              </div>
            </div>

            {/* Voluntariado Section */}
            <div className="scroll-mt-32" id="voluntariado">
              <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-primary text-3xl"><MdVolunteerActivism/></span>
                <h2 className="font-h2 text-h2 text-primary">Voluntariado</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-black">
                
                <VoluntariadoCard 
                  title="¿Cómo puedo ser voluntario?"
                  description="Para ser voluntario debes asistir a una de nuestras sesiones informativas mensuales. Anunciamos las fechas en nuestras redes sociales y sitio web. Después de la sesión, podrás elegir el área en la que prefieres ayudar."
                  actionText="Inscribirse a la próxima sesión"
                  actionLink="#"
                />

                <VoluntariadoCard 
                  title="¿Qué actividades realizan los voluntarios?"
                  description="Los voluntarios pueden ayudar paseando perros, socializando con gatos, apoyando en eventos de adopción, tomando fotografías de los animales, o ayudando en labores administrativas y de limpieza en el refugio."
                />

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};