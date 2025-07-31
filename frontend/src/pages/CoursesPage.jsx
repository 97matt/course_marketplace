import CourseComponent from "../components/CourseComponent";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import { coursesRequest } from "../api/courses";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function CoursesPage() {
	const [courses, setCourses] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;
	const [category, setCategory] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [page, setPage] = useState(1);
	
	const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await coursesRequest({
                    category,
                    min_price: minPrice,
                    max_price: maxPrice,
                    page,
                });
                setCourses(res.data.courses);
                setTotalPages(Math.ceil(res.data.total / 3));
                console.log("📦 Total items:", res.data.total);
                console.log("📦 Total pages:", Math.ceil(res.data.total / 3));
            } catch (error) {
                console.error("Error fetching filtered courses:", error.message);
            }
        };

	fetchCourses();
}, [category, minPrice, maxPrice, page]);


    //Removes course from screen after unenroll
    const handleRemoveCourse = (id) => {
    }

    return (
        <>
            <NavBarComponent />
            <div className="pt-3 text-center">
                <h1 className="h2">Nuestros Cursos</h1>
            </div>

        <div className="container d-flex flex-wrap justify-content-center gap-3 my-4">
            <select
                className="form-select"
                style={{ maxWidth: "200px" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Todas las categorías</option>
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
                {/* Agrega más según tu base de datos */}
            </select>

            <input
                type="number"
                className="form-control"
                placeholder="Precio mínimo"
                style={{ maxWidth: "150px" }}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
                type="number"
                className="form-control"
                placeholder="Precio máximo"
                style={{ maxWidth: "150px" }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>

            <div className="container d-flex flex-wrap justify-content-center">
                {courses.map((course) => (
                    <CourseComponent
                        key={course.course_id}
                        course={course}
                        user_rol={user?.user_rol || ''}
                        onRemove={handleRemoveCourse}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center my-4">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)}>
                                Anterior
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <li
                                key={pageNum}
                                className={`page-item ${page === pageNum ? "active" : ""}`}
                            >
                                <button className="page-link" onClick={() => setPage(pageNum)}>
                                    {pageNum}
                                </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)}>
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <FooterComponent />
        </>
    );
}
