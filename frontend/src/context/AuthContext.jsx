import { useContext, useState, createContext } from "react";
import { registerRequest, loginRequest } from "../api/users.js";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    //load user from localStorage if available
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    });
    
    // use token presence to determine auth state
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('token')
    })


    // Sign Up function
    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            console.log("Signup response:", res.data) //Check
            //Extract user + token de response
            const token = res.data.token
            const user = res.data.user || userData //Fallback if user isn't returned
            //Save a localStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            //Agregar token global a axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            //Set user en memoria
            setUser(user)
            setIsAuthenticated(true)
            //Return useful data
            return user
        } catch (error) {
            console.log("Error en AuthContext.jsx (signup):", error);
            throw error //Front can show error
        }
    };



    //Login Function
    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData)
            //Extraer user + token
            const user = res.data.user
            const token = res.data.token
            //Guardar ambos
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            //Set token en axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            //Set user
            setUser(user)
            setIsAuthenticated(true)
            return user
        } catch (error) {
            console.log("Error en AuthContext.jsx (signin):", error)
        }
    }



    //Logout Function
    const logout = () => {
        // Limpiar todo
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
        //Remove auth header de axios
        delete axios.defaults.headers.common['Authorization']
    }

    //Return the context provider
    return (
        <AuthContext.Provider value={{
            signup,
            user,
            signin,
            isAuthenticated,
            logout,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};
