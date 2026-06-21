import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    const navLinks = [
        { name: "Inicio", path: "/" },
        { name: "Sobre Nosotros", path: "/about-us" },
        { name: "Adopciones", path: "/adoptions" },
        { name: "Noticias", path: "/news" },
        { name: "Preguntas Frecuentes", path: "/faq" },
        { name: "Denuncias", path: "/reports" },
    ];

    const checkIsActive = (path) => {
        if (path === "/") {
        return currentPath === "/";
        }
        return currentPath.startsWith(path); 
    };

    return (
        <nav className="bg-surface-container-lowest dark:bg-stone-950/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-100 dark:border-stone-800 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
            <div className="max-w-320 mx-auto flex justify-between items-center px-4 lg:px-8 h-20">
                {/* Logo */}
                <Link className="flex items-center shrink-0 lg:pt-14" to="/">
                    <img
                        src="/CaanLogo.png"
                        alt="Logo CAAN"
                        className="w-20 lg:w-28 h-auto transition-all duration-300"
                    />
                </Link>

                {/* Menu de Escritorio */}
                <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 font-sans text-sm font-medium tracking-tight text-on-surface-variant">
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
                <div className="flex items-center gap-3 lg:gap-5">
                    
                    {/* Botón Donar  */}
                    <Link to="/donations" className="hidden lg:block">
                        <button className="bg-primary/90 border-primary text-white font-label-sm text-label-sm px-6 py-3.5 rounded-full active:scale-95 transition-transform duration-200 hover:bg-primary/70">
                            Donar
                        </button>
                    </Link>

                    {/*Sección de Usuario y Cerrar Sesión*/}
                    {isAuthenticated && (
                        <div className="hidden lg:flex items-center gap-3 pl-2 lg:pl-5 border-l border-stone-200 dark:border-stone-800">
                            
                            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-stone-100/80 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-full shadow-sm">
                                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 pr-1 truncate max-w-30" title={user?.username}>
                                    {user?.username}
                                </span>
                            </div>
                            
                            {/* Botón Logout */}
                            <button 
                                onClick={logout} 
                                title="Cerrar Sesión"
                                className="p-2.5 rounded-full text-stone-500 hover:text-red-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* 3. Boton Hamburguesa */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-stone-600 dark:text-stone-400 hover:text-emerald-600 focus:outline-none p-2"
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
                <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-l border-b border-stone-200 dark:border-stone-800 shadow-2xl absolute w-80 right-0 top-20 rounded-bl-2xl">
                    <div className="flex flex-col px-6 py-6 space-y-4 font-sans text-base font-medium tracking-tight">
                        
                        {/* Info de usuario y Cerrar Sesión en menú móvil */}
                        {isAuthenticated && (
                            <div className="flex items-center justify-between pb-4 mb-2 border-b border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-bold">Sesión iniciada</p>
                                        <p className="font-bold text-stone-800 dark:text-stone-200">{user?.username}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    title="Cerrar Sesión"
                                    className="p-2 text-stone-400 hover:text-red-500 bg-stone-50 dark:bg-stone-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        )}

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
};