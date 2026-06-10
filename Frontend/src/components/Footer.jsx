import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full py-6 lg:py-10 mt-auto">
            {/* Volvemos a grid-cols-4 para pantallas grandes */}
            <div className="max-w-container_max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

                {/* Columna 1: Marca y Descripción */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <img src="/CaanLogo.png" alt="Logo CAAN" className="w-16 h-auto" />
                        <p className="font-h3 text-xl text-primary">CAAN</p>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant pr-4 leading-relaxed">
                        Centro de Ayuda al Animal de Necochea. Rescatamos, rehabilitamos y buscamos familias amorosas para animales en situación de calle.
                    </p>
                </div>

                {/* Columna 2: Legales */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Privacidad y Legal</h3>
                    <div className="flex flex-col space-y-3">
                        <a className="font-body-md text-sm text-on-surface-variant hover:text-primary hover:underline transition-all w-fit" href="#">Términos Legales</a>
                        <a className="font-body-md text-sm text-on-surface-variant hover:text-primary hover:underline transition-all w-fit" href="#">Políticas de Uso</a>
                        <a className="font-body-md text-sm text-on-surface-variant hover:text-primary hover:underline transition-all w-fit" href="#">Preferencias</a>
                    </div>
                </div>

                {/* Columna 3: Contacto y Redes */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Contacto</h3>
                    <p className="font-body-md text-sm text-on-surface-variant mb-2 pr-4">
                        Comunícate directamente a través de nuestras redes sociales.
                    </p>
                    <div className="flex flex-col gap-3 pt-1">
                        <a
                            href="https://www.instagram.com/caanecochea/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 bg-surface-container-low hover:bg-[#C13584] hover:text-on-primary text-on-surface transition-all px-4 py-2.5 rounded-xl font-label-sm text-sm border border-outline-variant/30 shadow-sm w-fit"
                        >
                            <span className="text-[20px]"><FaInstagram /></span>Instagram
                            
                        </a>
                        <a
                            href="https://www.facebook.com/groups/291987354785530"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 bg-surface-container-low hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] text-on-surface transition-all px-4 py-2.5 rounded-xl font-label-sm text-sm border border-outline-variant/30 shadow-sm w-fit"
                        >
                            <span className="text-[20px]"><FaFacebook /></span>Facebook
                        </a>
                    </div>
                </div>

                {/* Columna 4: El Proyecto (Ex Bottom Bar) */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">El Proyecto</h3>
                    <div className="flex flex-col gap-4 pt-1">

                        {/* Tarjeta UTN adaptada para columna */}
                        <div className="flex items-center gap-3 text-on-surface-variant bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/50 shadow-sm cursor-default">
                            <span className="text-[24px] text-primary"><FaUniversity /></span>
                            <div className="font-body-sm text-sm leading-snug pt-0.5">
                                Desarrollado por alumnos de la <strong className="text-primary font-bold">Universidad Tecnológica Nacional</strong> (UTN)
                            </div>
                        </div>
                        {/* Textos de firma y copyright */}
                        <div className="flex flex-col gap-1.5 mt-1">
                            <p className="font-body-md text-xs text-outline mt-1 leading-relaxed">
                                © {new Date().getFullYear()} CAAN. <br />Todos los derechos reservados.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}