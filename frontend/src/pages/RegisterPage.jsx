import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        user_name: "",
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_password: "",
        user_role: "0",
    });

    const navegate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // logica
        navegate('/profile')
    };

    return (
        <>
            <NavBarComponent />
            <form onSubmit={handleSubmit} className="card p-3 m-auto mt-5 shadow" style={{ width: "24rem" }}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="First name"
                    name="user_first_name"
                    value={formData.user_first_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Last name"
                    name="user_last_name"
                    value={formData.user_last_name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                />

                <select
                    name="user_role"
                    className="form-select mb-3"
                    value={formData.user_role}
                    onChange={handleChange}
                >
                    <option value="0">Student</option>
                    <option value="1">Professor</option>
                </select>

                <div className="d-flex justify-content-between">
                    <Link to="/login" className="btn btn-outline-secondary">Cancelar</Link>
                    <button type="submit" className="btn btn-success">Registrar</button>

                </div>
            </form>
        </>
    );
}
