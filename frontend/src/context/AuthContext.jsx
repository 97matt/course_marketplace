import { useContext, useState, createContext } from "react";
import { registerRequest, loginRequest } from "../api/users.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            console.log("Error en AuthContext.jsx:", error);
        }
    };
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            const data = res.data.user
            setUser(data);
            setIsAuthenticated(true)
            return data
        } catch (error) {
            console.log("Error en singin AuthContext.jsx:", error);
        }
    };

    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ signup, user, signin, isAuthenticated, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
