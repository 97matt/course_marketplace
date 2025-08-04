import imagenCurso from '../assets/img/imagen.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { newEnrollRequest, getStudentCoursesRequest, unenrollFromCourseRequest } from "../api/enroll";
import { useEffect, useState } from 'react';
import "./CourseComponent.css";
import { likeCourseRequest, unlikeCourseRequest, getUserLikesRequest } from '../api/likes';
import { deleteCourseRequest } from '../api/courses'; // ✅ added
import { useAuth } from '../context/AuthContext';

export default function CourseComponent({ course, user_rol = "", onRemove }) {
    if (!course) return null
    const {user} = useAuth()
    const user_id = user?.user_id
    const {
        course_id,
        course_title,
        course_description,
        course_category,
        course_price,
        course_img,
        professor_id,
        professor_first_name,
        professor_last_name,
        like_count,
        course_start_date
    } = course;

    const isProfessor = user_rol === 'professor';
    const isCourseOwner = isProfessor && user_id === professor_id;
    console.log("USER ID:", user_id);
    console.log("PROFESSOR ID:", professor_id);
    console.log("Is Course Owner?", isCourseOwner);

    const [listCoursesStudent, setListCoursesStudent] = useState([]);
    const [listCoursesStudentComplete, setListCoursesStudentComplete] = useState([]);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);

    const formattedDate = new Date(course_start_date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user_id) {
            const fetchDataStudent = async () => {
                try {
                    const res = await getStudentCoursesRequest(user_id);
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
    }, [user_id]);

    const handleOnClick = async () => {
        setLoading(true);
        try {
            console.log(user_id)
            if (!user_id) {
                navigate('/login', { state: { message: 'Por favor, inicia sesión' } });
                return;
            }

            const data = {
                user_id,
                course_id
            };
            await newEnrollRequest(data);

            setListCoursesStudent(prev => [...prev, course_id]);

            const res = await getStudentCoursesRequest(user_id);
            const fullList = res.data.courses;
            const onlyIds = fullList.map(d => d.course_id);

            setListCoursesStudentComplete(fullList);
            setListCoursesStudent(onlyIds);
        } catch (error) {
            console.error('Error al inscribirse:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOnClickDelete = async () => {
        if (isCourseOwner) {
            const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.");
            if (!confirmed) return;

            try {
                await deleteCourseRequest(course_id);
                if (typeof onRemove === 'function') {
                    onRemove(course_id);
                }
            } catch (error) {
                console.error("Error deleting course:", error);
            }
            return;
        }

        // Student unenroll logic
        setLoading(true);
        try {
            const user_course = listCoursesStudentComplete.find(i => i.course_id === course_id);
            if (user_course) {
                await unenrollFromCourseRequest(user_course.user_course_id);
                setListCoursesStudent(prev => prev.filter(cid => cid !== course_id));
                setListCoursesStudentComplete(prev => prev.filter(c => c.course_id !== course_id));

                if (typeof onRemove === 'function' && user_rol === 'student') {
                    onRemove(course_id);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchLikedStatus = async () => {
            if (user_id) {
                try {
                    const res = await getUserLikesRequest(user_id);
                    const likedCourses = res.data.likedCourses;

                    if (likedCourses.includes(course_id)) {
                        setLiked(true);
                    }
                } catch (error) {
                    console.error("Error loading liked courses:", error.message);
                }
            }
        };

        fetchLikedStatus();
    }, [user_id, course_id]);

    const toggleLike = async () => {
        if (!user_id) {
            navigate('login', { state: { message: 'Por favor, inicia sesión para dar like' } });
            return;
        }

        try {
            if (!liked) {
                await likeCourseRequest(user_id, course_id);
            } else {
                await unlikeCourseRequest(user_id, course_id);
            }
            setLiked(prev => !prev);
        } catch (error) {
            console.error("Error toggling like:", error.response?.data || error.message);
        }
    };

    return (
        <div className="card course-card shadow-sm mx-2 mt-4 border-0" style={{ width: "15rem" }}>
            <img src={course_img} alt={course_title} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title d-flex align-items-center">
                    <span onClick={toggleLike} style={{ cursor: "pointer" }} title="Agregar a favoritos" className='me-2'>
                        {liked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-star-fill text-success mb-1" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-star mb-1" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593L8 13.187l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73
                                                3.522-3.356c.33-.314.16-.888-.281-.95l-4.898-.696L8 .792 5.816 5.12l-4.898.696c-.441.062-.612.636-.283.95l
                                                3.522 3.356-.83 4.73z" />
                            </svg>
                        )}
                    </span>
                    {course_title}
                </h5>
                <div>
                    <small className="text-danger">{course_category}</small>
                    <p className="mb-1">
                        <span>Inicio: </span>
                        <span className="text-primary">{formattedDate}</span>
                    </p>
                </div>
                <p className="card-text small text-justify description">{course_description}</p>

                {!isProfessor && (
                    <p className='small'>Profesor: <Link to={`/profile/professor/${professor_id}`} className="text">
                        <b>{professor_first_name} {professor_last_name}</b>
                    </Link></p>
                )}

                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success ms-3">${course_price}</span>

                    {!isProfessor && (
                        !listCoursesStudent.includes(course_id) ? (
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

                    {isCourseOwner && onRemove && (
                        <button className="btn btn-sm btn-outline-danger" onClick={handleOnClickDelete}>
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
