import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newCourseRequest } from "../api/courses";
import { useAuth } from "../context/AuthContext";

export default function NewCourseComponent() {
    const { user } = useAuth(); // <-- mover arriba
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        course_title: "",
        course_professor_id: user.user_id,
        course_professor_rol: user.user_rol,
        course_description: "",
        course_price: 1,
        course_start_date: "",
        course_img: null,
        course_category: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData)
            await newCourseRequest(formData);
            navigate("/profile");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className="card shadow m-3">
            <div className="card-header">
                <span className="h2">Nuevo Curso</span>
            </div>
            <div className="card-body">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Título del curso"
                    name="course_title"
                    value={formData.course_title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Descripción"
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleChange}
                    maxLength={155}
                    required
                />
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Precio"
                            name="course_price"
                            value={formData.course_price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="date"
                            className="form-control mb-3"
                            name="course_start_date"
                            value={formData.course_start_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <select
                            name="course_category"
                            className="form-select mb-3"
                            value={formData.course_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>Seleccione un tipo de curso</option>
                            <option value="web_development">Desarrollo Web</option>
                            <option value="programming">Programación</option>
                            <option value="graphic_design">Diseño Gráfico</option>
                            <option value="digital_marketing">Marketing Digital</option>
                            <option value="cybersecurity">Ciberseguridad</option>
                            <option value="data_science">Ciencia de Datos</option>
                            <option value="finance">Finanzas y Contabilidad</option>
                            <option value="languages">Idiomas</option>
                            <option value="photography">Fotografía</option>
                            <option value="music">Música</option>
                            <option value="business">Negocios y Emprendimiento</option>
                            <option value="health">Salud y Bienestar</option>
                            <option value="other">Otros</option>
                        </select>

                    </div>
                    <div className="col-md-6">
                        <input
                            type="file"
                            className="form-control mb-3"
                            name="course_img"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                </div>


            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-md-6 p-2">
                        <Link to="/profile" className="btn btn-outline-secondary w-100">Volver</Link>
                    </div>
                    <div className="col-md-6 p-2">
                        <button type="submit" className="btn btn-success w-100">Publicar</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
