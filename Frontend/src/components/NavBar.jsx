import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    const navLinks = [
        { name: "Inicio", path: "/" },
        { name: "Sobre Nosotros", path: "/about-us" },
        { name: "Adopciones", path: "/adoptions" },
        { name: "Noticias", path: "/news" },
        { name: "FAQ", path: "/faq" },
        { name: "Contacto", path: "/contact" },
    ];

    const checkIsActive = (path) => {
        if (path === "/") {
        return currentPath === "/";
        }
        return currentPath.startsWith(path); 
    };

    return (
        <nav className="bg-white/95 dark:bg-stone-950/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-100 dark:border-stone-800 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-20">
                {/* Logo */}
                <Link className="flex items-center shrink-0 lg:pt-14" to="/">
                    <img
                        src="/CaanLogo.png"
                        alt="Logo CAAN"
                        className="w-20 md:w-32 h-auto transition-all duration-300"
                    />
                </Link>

                {/* Menu de Escritorio */}
                <div className="hidden md:flex items-center space-x-6 font-sans text-sm font-medium tracking-tight">
                    {navLinks.map((link) => {
                        const isActive = checkIsActive(link.path);
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-3 py-2 transition-all duration-300 ${
                                isActive
                                    ? "text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-700 pb-1"
                                    : "text-stone-600 dark:text-stone-400 hover:text-emerald-600 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-md"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Botones derecha */}
                <div className="flex items-center gap-4">
                    {isAuthenticated && (
                        <button 
                            onClick={logout} 
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm px-4 py-2 rounded-full transition-colors"
                        >
                            Salir
                        </button>
                    )}
                    <Link to="/donations" className="hidden md:block">
                        <button className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full hover:bg-primary-container active:scale-95 transition-transform duration-200">
                            Donar
                        </button>
                    </Link>

                    {/* Boton Hamburguesa */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-stone-600 dark:text-stone-400 hover:text-emerald-600 focus:outline-none p-2"
                        aria-label="Menú principal"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                                ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    )}
                            </svg>
                    </button>
                </div>
            </div>

            {/* Menu Desplegable Movil */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-100 dark:border-stone-800 shadow-lg absolute w-full left-0 top-20">
                    <div className="flex flex-col px-6 py-6 space-y-4 font-sans text-base font-medium tracking-tight">
                        {navLinks.map((link) => {
                            const isActive = checkIsActive(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`transition-colors ${
                                        isActive
                                        ? "text-emerald-700 dark:text-emerald-300 font-bold"
                                        : "text-stone-600 dark:text-stone-400 hover:text-emerald-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        {isAuthenticated && (
                            <button 
                                onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                                className="w-full text-left py-2 text-red-600 font-bold border-t border-stone-100 mt-2 pt-2"
                            >
                                Cerrar Sesión
                            </button>
                        )}
                        <Link
                            to="/donations"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="pt-4 mt-2 border-t border-stone-200 dark:border-stone-800"
                        >
                            <button className="w-full bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full hover:bg-primary-container active:scale-95 transition-transform duration-200">
                                Donar
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
