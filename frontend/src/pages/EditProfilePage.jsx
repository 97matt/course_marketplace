import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";
import { useAuth } from "../context/AuthContext";
import { updateUserRequest } from "../api/users"

export default function RegisterPage() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        user_id: user.user_id,
        user_name: user.user_name,
        user_first_name: user.user_first_name,
        user_last_name: user.user_last_name,
        user_email: user.user_email,
        user_rol: user.user_rol,
        user_img: "....//",
        user_password: "",
        new_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //await signup(formData);
            const update = await updateUserRequest(formData.user_id, formData)
            setError("");
            setUser(update.data.user);
            navigate("/profile");
        } catch (err) {
            console.log(err);
            setError("Contraseña erronea");
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
                    placeholder="Name"
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
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Nuevo password (opcional)"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                />
                <select
                    name="user_rol"
                    className="form-select mb-3"
                    value={formData.user_rol}
                    onChange={handleChange}
                    disabled
                >
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                </select>

                <div className="d-flex justify-content-between">
                    <Link to="/prefile" className="btn btn-outline-secondary">
                        Cancelar
                    </Link>
                    <button type="submit" className="btn btn-success">
                        Actualizar
                    </button>
                </div>
            </form>
        </>
    );
}
