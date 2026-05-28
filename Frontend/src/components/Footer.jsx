import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 py-8">
            <div className="max-w-320 mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Columna Izquierda: Marca, Copyright */}
                <div className="space-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="font-bold text-xl text-emerald-900 dark:text-emerald-50">CAAN</p>
                    <p className="font-sans text-sm text-stone-500">
                        © {new Date().getFullYear()} CAAN. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Link 
                            to="/terminos" 
                            className="font-sans text-sm text-stone-500 hover:text-emerald-600 hover:underline transition-all opacity-80 hover:opacity-100"
                        >
                            Términos de Uso
                        </Link>
                    </div>
                </div>

                {/* Columna Derecha: Botón de Contacto */}
                <div className="flex flex-col space-y-2 items-center md:items-end">
                    <Link
                        to="/contact"
                        className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-3 rounded-full hover:bg-primary transition-colors hover:text-on-primary"
                    >
                        Contáctanos
                    </Link>
                </div>
                
            </div>
        </footer>
    );
}