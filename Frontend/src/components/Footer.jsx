import React from 'react';
import { FaFacebook, FaInstagram, FaUniversity } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full py-4 lg:py-10 mt-auto">
            <div className="max-w-container_max mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

                {/* Columna 1: Marca y Descripción (5 de 12) */}
                <div className="sm:col-span-2 lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <img src="/CaanLogo.png" alt="Logo CAAN" className="w-16 h-auto" />
                        <p className="font-h3 text-xl text-primary">CAAN</p>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant lg:pr-12 leading-relaxed">
                        Centro de Ayuda al Animal de Necochea. Rescatamos, rehabilitamos y buscamos familias amorosas para animales en situación de calle.
                    </p>
                    {/* Bloque: Términos Legales Unificados */}
                    <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Legal</h3>
                    <a
                        className="font-body-md text-sm text-on-surface-variant hover:text-primary hover:underline transition-all w-fit block"
                        href="#"
                    >
                        Términos Legales
                    </a>
                </div>

                {/* Columna 2: Contacto + Legales (4 de 12) */}
                <div className="sm:col-span-1 lg:col-span-4 flex flex-col gap-8">

                    {/* Bloque: Redes Sociales */}
                    <div className="space-y-4">
                        <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Contacto</h3>
                        <p className="font-body-md text-sm text-on-surface-variant mb-2 lg:pr-4">
                            Comunícate directamente a través de nuestras redes sociales.
                        </p>
                        <div className="flex flex-col gap-3 pt-1">
                            <a
                                href="https://www.instagram.com/caanecochea/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-3 bg-surface-container-low hover:bg-[#C13584] hover:text-white text-on-surface transition-all px-4 py-2.5 rounded-xl font-label-sm text-sm border border-outline-variant/30 shadow-sm w-full sm:w-fit"
                            >
                                <FaInstagram className="text-[20px]" /> Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/groups/291987354785530"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-3 bg-surface-container-low hover:bg-[#1877F2] hover:text-white text-on-surface transition-all px-4 py-2.5 rounded-xl font-label-sm text-sm border border-outline-variant/30 shadow-sm w-full sm:w-fit"
                            >
                                <FaFacebook className="text-[20px]" /> Facebook
                            </a>
                        </div>
                    </div>
                </div>

                {/* Columna 3: El Proyecto (3 de 12) */}
                <div className="sm:col-span-1 lg:col-span-4 space-y-4 mt-4 sm:mt-0 lg:mt-0">
                    <h3 className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">El Proyecto</h3>
                    <div className="flex flex-col gap-4 pt-1">

                        <div className="flex items-start gap-3 text-on-surface-variant bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/50 shadow-sm cursor-default">
                            <FaUniversity className="text-[24px] text-primary shrink-0 mt-0.5" />
                            <div className="font-body-sm text-sm leading-snug">
                                Desarrollado por alumnos de la <strong className="text-primary font-bold">Universidad Tecnológica Nacional</strong> (UTN)
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-1">
                            <p className="font-body-md text-xs text-outline leading-relaxed">
                                © {new Date().getFullYear()} CAAN. <br className="hidden sm:block lg:hidden" />Todos los derechos reservados.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}