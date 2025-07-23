import imagenCurso from '../assets/img/imagen.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { newEnrollRequest, getStudentCoursesRequest, unenrollFromCourseRequest } from "../api/enroll";
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import "./CourseComponent.css"

export default function CourseComponent({
    id,
    professor_id,
    professor_name = "nombre del profesor",
    description,
    price,
    title = 'Title',
    img = imagenCurso,
    user_rol = "",
    category = "Categoría"
}) {
    const isProfessor = user_rol === 'professor';
    const { user } = useAuth();

    const [listCoursesStudent, setListCoursesStudent] = useState([]);
    const [listCoursesStudentComplete, setListCoursesStudentComplete] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            const fetchDataStudent = async () => {
                try {
                    const res = await getStudentCoursesRequest(user.user_id);
                    const data = res.data.courses;
                    const list = data.map((d) => d);
                    const listOnlyCourse = list.map((d) => d.course_id);
                    setListCoursesStudent(listOnlyCourse);
                    setListCoursesStudentComplete(list);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDataStudent();
        }
    }, [user]); // ← importante incluir `user` como dependencia

    const handleOnClick = async () => {
        setLoading(true);
        try {
            if (!user) navigate('/login', { state: { message: 'Por favor, inicia sesión' } });

            const data = {
                user_id: user.user_id,
                course_id: id
            };
            await newEnrollRequest(data);
            navigate(location.pathname, { replace: true });
        } catch (error) {
            console.error('Error al inscribirse:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOnClickDelete = async () => {
        setLoading(true);
        try {
            const user_course = listCoursesStudentComplete.find(i => i.course_id == id);
            if (user_course) {
                await unenrollFromCourseRequest(user_course.user_course_id);
                navigate(location.pathname, { replace: true });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm mx-2 mt-3" style={{ width: "15rem" }}>
            <img src={img} alt="Curso" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-star-fill text-success mb-1 me-2" viewBox="0 0 16 16" title="Agregar a favoritos">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {title}
                </h5>
                <div>
                    <small className="text-danger">{category}</small>
                </div>


                <p className="card-text small text-justify description">{description}</p>

                {!isProfessor && (
                    <p className='small'>Profesor: <Link to={`/profile/professor/${professor_id}`} className="text">
                        <b>{professor_name}</b>
                    </Link></p>
                )}

                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success ms-3">${price}</span>

                    {!isProfessor && (
                        !listCoursesStudent.includes(id) ? (
                            <button className="btn btn-sm btn-success" onClick={handleOnClick} disabled={loading}>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    "Agregar"
                                )}
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-danger" onClick={handleOnClickDelete} disabled={loading}>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    "Eliminar"
                                )}
                            </button>
                        )
                    )}

                </div>
            </div>
        </div>
    );
}
