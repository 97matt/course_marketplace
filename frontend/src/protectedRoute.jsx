import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from './context/AuthContext.jsx';


export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) return <Navigate to='/' replace />
    return (<Outlet />)
}