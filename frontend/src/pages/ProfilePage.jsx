import NavBarComponent from "../components/NavBarComponent";
import CourseComponent from "../components/CourseComponent";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { coursesByProfessorRequest } from "../api/courses";
import { useEffect, useState } from "react";
import { getStudentCoursesRequest } from "../api/enroll";

export default function ProfilePage() {
    const { user } = useAuth();
    const [coursesByProfessor, setCoursesByProfessor] = useState([]);

    useEffect(() => {
        if (user.user_rol === 'professor') {
            const fetchDataProfessor = async () => {
                try {
                    const res = await coursesByProfessorRequest(user.user_id);
                    setCoursesByProfessor(res.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchDataProfessor();
        } else {
            const fetchDataStudent = async () => {
                try {
                    const res = await getStudentCoursesRequest(user.user_id);
                    setCoursesByProfessor(res.data.courses);

                } catch (error) {
                    console.log(error)
                }
            }
            fetchDataStudent()
        }
    }, []);

    return (
        <>
            <NavBarComponent />
            <div className="container mt-4">
                <div className="row">
                    {/* Perfil */}
                    <div className="col-md-7 mb-4">
                        <h2>Mi perfil</h2>
                        <img
                            src="/default-profile.png"
                            alt="Foto de perfil"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                backgroundColor: "#3889FF",
                                objectFit: "cover"
                            }}
                        />

                        <dl className="mt-3">
                            <dt>Nombre de usuario:</dt>
                            <dd>{user.user_name}</dd>

                            <dt>Nombre y apellido:</dt>
                            <dd>{user.user_first_name} {user.user_last_name}</dd>

                            <dt>E-mail:</dt>
                            <dd>{user.user_email}</dd>

                            <dt>Rol:</dt>
                            <dd>{user.user_rol}</dd>
                        </dl>
                        <Link to="/profile/edit" className="btn btn-warning">Editar perfil</Link>

                        {user.user_rol === "professor" && (
                            <Link to="/courses/new" className="btn btn-success ms-2">
                                Publicar nuevo curso
                            </Link>
                        )}
                    </div>

                    {/* Cursos */}
                    <div className="col-md-5">
                        <h2>Mis cursos</h2>
                        {
                            coursesByProfessor.map((course) => (
                                <CourseComponent
                                    key={course.course_id}
                                    id={course.course_id}
                                    description={course.course_description}
                                    price={course.course_price}
                                    title={course.course_title}
                                    professor_id={course.course_professor}
                                    user_rol={user?.user_rol || ''}
                                    category={course.course_category}
                                />
                            )
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
