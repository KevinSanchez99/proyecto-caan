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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-100 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Acceso Administrador
            </h2>
        </div>

        {errors?.map((error, i) => (
            <div
            className="bg-red-500 p-3 text-white text-center text-sm mb-4 rounded-md"
            key={i}
            >
            {error}
            </div>
        ))}

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Usuario
            </label>
            <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                placeholder="admin"
            />
            </div>

            <div>
            <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Contraseña
            </label>
            <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                placeholder="••••••••"
            />
            </div>

            <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
            >
            Entrar
            </button>
        </form>
        </div>
    </div>
    );
}
