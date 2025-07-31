import { useEffect, useState } from "react";
import { getTopLikedCoursesRequest } from "../api/likes";
import { useAuth } from "../context/AuthContext";

import CourseComponent from "../components/CourseComponent";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import imagenCurso from "../../public/assets/students.jpg";

export default function HomePage() {
    //Initialize with empty array
    const [topCourses, setTopCourses] = useState([])
    const { user } = useAuth()

    //Fetch top liked courses
    useEffect(() => {
        const fetchTopCourses = async () => {
            try {
                const res = await getTopLikedCoursesRequest()
                setTopCourses(res.data) //Returns 3 courses
            } catch (error) {
                console.error("Error fetching top liked courses", error.message)
            }
        }

        fetchTopCourses()
    }, [])

    return (
        <>
            <NavBarComponent />
            <div className="row align-items-center m-0 p-3 mt-5 rounded" style={{ minHeight: "100%", backgroundColor: "#f8f9fa" }}>
                <div className="col-12 col-md-3 m-0 p-0">
                    <div className="bg-light border rounded m-0 p-0">
                        <img
                            src={imagenCurso}
                            alt="Imagen del curso"
                            style={{ width: "100%", height: "100%", maxHeight: "80%", objectFit: "cover" }}
                        />
                    </div>
                </div>


                <div className="col-12 col-md-9 ps-3">
                    <h1 className="fw-bold text-primary mb-2">Tu Curso Online</h1>
                    <p className="text-muted fs-5 mb-0">
                        Aprender nunca fue tan fácil. <span className="text-success">Empieza hoy.</span>
                    </p>
                </div>
            </div>

        {/* Cursos mas populares section */}
        <div className="row m-auto mb-t">
            <div className="col-12 p-3">
                <h2 className="text-center h3">Cursos mas populares</h2>
            </div>

            {/* Render top 3 dynamically once loaded */}
            {topCourses.length === 3 && (
                <div className="d-flex justify-content-center gap-4 my-4">
                    <div className="col-md-3">
                        <CourseComponent course={topCourses[1]} user_rol={user?.user_rol} user_id={user?.user_id} />
                    </div>
                    <div className="col-md-3">
                        <CourseComponent course={topCourses[0]} user_rol={user?.user_rol} user_id={user?.user_id} />
                    </div>
                    <div className="col-md-3">
                        <CourseComponent course={topCourses[2]} user_rol={user?.user_rol} user_id={user?.user_id} />
                    </div>
                </div>
            )}
        </div>
        

            <FooterComponent />
        </>
    )
}