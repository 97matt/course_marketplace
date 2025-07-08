import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";

export default function LoginPage() {
    const navegate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: "",
        user_password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login enviado:", formData);
        navegate('/profile')
        // Aquí puedes autenticar contra tu backend
    };

    return (
        <>
            <NavBarComponent />
            <form onSubmit={handleSubmit} className="card p-3 m-auto mt-5 shadow" style={{ width: "18rem" }}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                />

                <div className="d-flex justify-content-between mb-2">
                    <button type="submit" className="btn btn-success w-100 me-1">Ingresar</button>
                </div>
                <Link to="/register" className="btn btn-outline-secondary w-100">Registrarse</Link>
            </form>
        </>
    );
}
