import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";
import { useAuth } from "../context/AuthContext";
import AlertComponent from "../components/AlertComponent";


export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_name: "",
        user_password: "",
    });

    const [errors, setErrors] = useState({
        user_name: "",
        user_password: "",
    });

    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const { signin } = useAuth();
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        if (message) {
            setAlert({
                show: true,
                type: 'warning',
                message: message,
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Limpiar el error del campo si se comienza a escribir
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            user_name: formData.user_name.trim() ? '' : 'Este campo es obligatorio',
            user_password: formData.user_password.trim() ? '' : 'Este campo es obligatorio',
        };

        setErrors(newErrors);

        // Si hay errores, no continuar
        if (Object.values(newErrors).some(msg => msg !== '')) return;

        try {
            const res = await signin(formData);
            if (res) {
                navigate('/profile');
            } else {
                setAlert({
                    show: true,
                    type: 'danger',
                    message: 'Usuario o contraseña incorrecta',
                });
            }
        } catch (error) {
            console.log(error);
            setAlert({
                show: true,
                type: 'danger',
                message: 'Ocurrió un error al intentar iniciar sesión.',
            });
        }
    };

    return (
        <>
            <NavBarComponent />
            <div className="pt-5">
                <form onSubmit={handleSubmit} className="card p-3 m-auto mt-5 shadow" style={{ width: "18rem" }}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.user_name ? 'is-invalid' : ''}`}
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            id="user_name"
                            placeholder=" "
                        />
                        <label htmlFor="user_name">Nombre de usuario</label>
                        {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.user_password ? 'is-invalid' : ''}`}
                            name="user_password"
                            value={formData.user_password}
                            onChange={handleChange}
                            id="user_password"
                            placeholder=" "
                        />
                        <label htmlFor="user_password">Password</label>
                        {errors.user_password && <div className="invalid-feedback">{errors.user_password}</div>}
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" className="btn btn-success w-100 me-1">Ingresar</button>
                    </div>
                    <Link to="/register" className="btn btn-outline-secondary w-100">Registrarse</Link>
                </form>

            </div>


            {alert.show && (
                <div className="container mt-3">
                    <AlertComponent type={alert.type} message={alert.message} />
                </div>
            )}
        </>
    );
}
