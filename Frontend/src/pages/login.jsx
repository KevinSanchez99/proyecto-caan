import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { signin, errors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        signin({ username, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-complement px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Tarjeta de Login */}
            <div className="w-full max-w-[450px] bg-surface-container-lowest p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-outline-variant/20 relative z-10">
                
                {/* Logo y Encabezado */}
                <div className="mb-10 text-center flex flex-col items-center">
                    <img src="./CaanLogo.png" alt="Logo CAAN" className="w-24 h-auto mb-6" />
                    <h2 className="font-h2 text-3xl text-on-surface tracking-tight">
                        Acceso Administrador
                    </h2>
                    <p className="font-body-md text-on-surface-variant mt-2">
                        Ingresa tus credenciales para gestionar el sistema
                    </p>
                </div>

                {errors && errors.length > 0 && (
                    <div className="mb-6 space-y-3">
                        {errors.map((error, i) => (
                            <div 
                                className="bg-error-container text-on-error-container p-4 rounded-2xl flex items-start gap-3 border border-error/20 shadow-sm"
                                key={i}
                            >
                                <span className="material-symbols-outlined text-error shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    error
                                </span>
                                <span className="font-body-md text-sm mt-0.5">{error}</span>
                            </div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Usuario */}
                    <div>
                        <label 
                            htmlFor="username" 
                            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1"
                        >
                            Usuario
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                                person
                            </span>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-surface-bright border border-outline-variant rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface placeholder-outline/60 shadow-sm"
                                placeholder="admin"
                            />
                        </div>
                    </div>

                    {/* Input Contraseña */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                                lock
                            </span>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-surface-bright border border-outline-variant rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface placeholder-outline/60 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Botón Ingresar*/}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-sm flex justify-center items-center gap-2"
                        >
                            Ingresar
                            <span className="material-symbols-outlined text-[18px]">login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};