import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verifyTokenRequest } from "../../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest();
                
                // Si el backend responde sin datos de usuario
                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                // Si encuentra el usuario, mantenemos la sesión activa
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                // Si el token expiró, no es válido o no existe cookie
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                console.log(error);
            }
        };
        checkLogin();
    }, []);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error("Detalles del error de login:", error);
            
            const mensajeError = error.response?.data?.message 
                            || error.response?.data 
                            || "Error al conectar con el servidor";
                            
            setErrors([mensajeError]);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return(
        <AuthContext.Provider 
            value={{
                user,
                isAuthenticated,
                errors,
                signin,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};