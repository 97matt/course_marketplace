import CourseComponent from "../components/CourseComponent"
import NavBarComponent from "../components/NavBarComponent"
export default function CoursesPage() {
    return (
        <>
            <NavBarComponent />
            <div className="">
                <CourseComponent />
                <CourseComponent />
                <CourseComponent />
            </div>
        </>
    )
}