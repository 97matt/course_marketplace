import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        user_name: "",
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_password: "",
        user_rol: "student",
        user_img: "....//" // ********* debemos cambiar esto
    });

    const { signup } = useAuth(); // corregido
    const navigate = useNavigate(); // corregido
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signup(formData)
            if (user && user.user_id) {
                setTimeout(() => {
                    navigate("/profile")
                }, 200)
            
            } else {
                throw new Error("Usuario no es valido")
            }
        } catch (err) {
            console.log("Signup error:", err);
            setError("Error al registrarse. Intenta nuevamente.");
        }
    };

    return (
        <>
            <NavBarComponent />
            <form
                onSubmit={handleSubmit}
                className="card p-3 m-auto mt-5 shadow"
                style={{ width: "24rem" }}
            >
                {error && <div className="alert alert-danger">{error}</div>}

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Username"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="First name"
                    name="user_first_name"
                    value={formData.user_first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Last name"
                    name="user_last_name"
                    value={formData.user_last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="user_rol"
                    className="form-select mb-3"
                    value={formData.user_rol}
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                </select>

                <div className="d-flex justify-content-between">
                    <Link to="/login" className="btn btn-outline-secondary">
                        Cancelar
                    </Link>
                    <button type="submit" className="btn btn-success">
                        Registrar
                    </button>
                </div>
            </form>
        </>
    );
}
