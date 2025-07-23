import CourseComponent from "../components/CourseComponent";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import { coursesRequest } from "../api/courses";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await coursesRequest();
            const data = res.data;
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <>
            <NavBarComponent />
            <div className="pt-3 text-center">
                <h1 className="h2">Nuestros Cursos</h1>
            </div>
            <div className="container d-flex flex-wrap justify-content-center">
                {courses.map((course) => (
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
                ))}
            </div>
            <FooterComponent />
        </>
    );
}
