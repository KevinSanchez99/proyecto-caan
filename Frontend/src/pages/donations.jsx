import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CopyRow from '../components/donations/CopyRow';
export default function Donations() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col pt-20">
      <NavBar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-20 flex-grow w-full">
        
        {/* Cabecera */}
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <h1 className="font-h1 text-4xl md:text-5xl text-primary mb-4">
            Tu ayuda transforma vidas
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant">
            Cada aporte, sin importar la forma, nos permite seguir rescatando y cuidando a los animales que más nos necesitan. ¡Elige la forma de ayudar que mejor se adapte a ti!
          </p>
        </header>

        {/* Contenedor Principal a 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* COLUMNA 1: Donaciones Económicas */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-3">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
              <h2 className="font-h2 text-2xl md:text-3xl text-on-surface">Aportes Económicos</h2>
            </div>
            <p className="text-on-surface-variant font-body-md">
              Puedes realizar transferencias directas a nuestras cajas de ahorro oficiales. Cada peso suma para cubrir gastos veterinarios y alimentación.
            </p>

            {/* Tarjeta Banco 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">Banco Provincia</h3>
                  <p className="text-sm text-on-surface-variant">Caja de Ahorros en Pesos</p>
                </div>
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Oficial</span>
              </div>
              <div className="space-y-3 bg-surface-container-low p-4 rounded-xl font-mono text-sm md:text-base text-on-surface">
                <CopyRow label="Alias" value="CAAN.NECOCHEA.DONAR" colorClass="text-primary" />
                <CopyRow label="CBU" value="0140327303613000000000" />
              </div>
            </div>

            {/* Tarjeta Banco 2 / Billetera Virtual */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#009EE3]">Mercado Pago</h3>
                  <p className="text-sm text-on-surface-variant">Billetera Virtual</p>
                </div>
                <span className="material-symbols-outlined text-[#009EE3] text-3xl">payments</span>
              </div>
              <div className="space-y-3 bg-surface-container-low p-4 rounded-xl font-mono text-sm md:text-base text-on-surface">
                <CopyRow label="Alias" value="CAAN.MP.DONACIONES" colorClass="text-[#009EE3]" />
                <CopyRow label="CVU" value="0000003100000000000000" />
              </div>
            </div>
          </section>

          {/* COLUMNA 2: Donaciones Materiales y Socios */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-3 mb-2">
              <span className="material-symbols-outlined text-secondary text-3xl">volunteer_activism</span>
              <h2 className="font-h2 text-2xl md:text-3xl text-on-surface">Otras formas de ayudar</h2>
            </div>
            
            {/* Lista de materiales */}
            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">pet_supplies</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-lg mb-1">Alimentos no perecederos</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Recibimos donaciones de bolsas de alimentos (balanceado) para perros adultos y cachorros.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">laundry</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-lg mb-1">Ropa y Abrigo</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Aceptamos ropa, frazadas, mantas y cuchas. <br/>
                  <strong className="text-error bg-error-container/30 px-1 rounded">Aclaración importante:</strong> Todo debe estar en buen estado. No se reciben cosas en mal estado o rotas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">handyman</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-lg mb-1">Materiales de construcción</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Ladrillos, maderas, chapas, alambre, etc. Todo material suma para mantener y mejorar los caniles de nuestro predio.
                </p>
              </div>
            </div>

            {/* Banner de Socio */}
            <div className="flex gap-4 p-6 bg-secondary-container text-on-secondary-container rounded-2xl shadow-md mt-2 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 opacity-10">
                <span className="material-symbols-outlined text-[120px]">stars</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-on-secondary-container/10 flex items-center justify-center shrink-0 relative z-10">
                <span className="material-symbols-outlined">group_add</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-1">¡Hazte Socio del CAAN!</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  Colabora activamente con nosotros. Ser socio te permite ser parte de la familia CAAN y participar en nuestros eventos y campañas exclusivas cuando se realicen.
                </p>
              </div>
            </div>

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};