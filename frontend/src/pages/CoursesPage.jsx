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
	const [maxPrice, setMaxPrice] = useState("");
	const [page, setPage] = useState(1);
	
	const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log("🔍 Fetching courses with filters:", { category, maxPrice, page });
                const params = {
                    page,
                };
                
                // Only add category if it's not empty
                if (category && category !== "") {
                    params.category = category;
                }
                
                // Only add max_price if it's not empty
                if (maxPrice && maxPrice !== "") {
                    params.max_price = maxPrice;
                }
                
                const res = await coursesRequest(params);
                // Add safety checks for undefined responses
                if (res && res.data) {
                    setCourses(res.data.courses || []);
                    const total = res.data.total || 0;
                    setTotalPages(Math.ceil(total / 3));
                    console.log("📦 Total items:", total);
                    console.log("📦 Total pages:", Math.ceil(total / 3));
                    console.log("📚 Courses received:", res.data.courses?.length || 0);
                } else {
                    setCourses([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Error fetching filtered courses:", error.message);
                setCourses([]);
                setTotalPages(1);
            }
        };

	fetchCourses();
}, [category, maxPrice, page]);


    //Removes course from screen after unenroll
    const handleRemoveCourse = (id) => {
    }

return (
			<div className="main-wrapper">
				<NavBarComponent />

				<main className="content d-flex flex-column align-items-center w-100 px-3">
					{/* Title */}
					<div className="pt-4 text-center">
						<h1 className="h2">Nuestros Cursos</h1>
					</div>

					{/* Filters */}
					<div className="d-flex flex-wrap justify-content-center gap-3 my-4" style={{ maxWidth: '900px', width: '100%' }}>
						<select
							className="form-select"
							style={{ maxWidth: "200px" }}
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
								setPage(1); // Reset to page 1 when category changes
							}}
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
						</select>

						<input
							type="number"
							className="form-control"
							placeholder="Precio máximo"
							style={{ maxWidth: "150px" }}
							value={maxPrice}
							onChange={(e) => {
								setMaxPrice(e.target.value);
								setPage(1); // Reset to page 1 when price filter changes
							}}
						/>
					</div>

					{/* Courses */}
					<div className="d-flex flex-wrap justify-content-center gap-4" style={{ width: '100%', maxWidth: '1200px' }}>
						{courses && courses.length > 0 ? (
							courses.map((course) => (
								<CourseComponent
									key={course.course_id}
									course={course}
									user_rol={user?.user_rol || ''}
									onRemove={handleRemoveCourse}
								/>
							))
						) : (
							<div className="text-center py-5">
								<p className="text-muted">No se encontraron cursos.</p>
							</div>
						)}
					</div>

					{/* Pagination */}
					<div className="d-flex justify-content-center my-4">
						<nav>
							<ul className="pagination">
								<li className={`page-item ${page === 1 ? "disabled" : ""}`}>
									<button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button>
								</li>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
									<li key={pageNum} className={`page-item ${page === pageNum ? "active" : ""}`}>
										<button className="page-link" onClick={() => setPage(pageNum)}>{pageNum}</button>
									</li>
								))}

								<li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
									<button className="page-link" onClick={() => setPage(page + 1)}>Siguiente</button>
								</li>
							</ul>
						</nav>
					</div>
				</main>

				<FooterComponent />
			</div>
);


}
