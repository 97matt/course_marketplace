import CourseComponent from "../components/CourseComponent";
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import imagenCurso from "../../public/assets/students.jpg";

export default function HomePage() {
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

            <div className="row m-auto mb-5">
                <div className="col-12 p-3">
                    <h2 className="text-center h3">Cursos mas populares</h2>
                </div>
                <div className="col-3">
                    <CourseComponent />
                </div>
                <div className="col-3">
                    <CourseComponent />
                </div>
                <div className="col-3">
                    <CourseComponent />
                </div>
                <div className="col-3">
                    <CourseComponent />
                </div>
            </div>
            <FooterComponent />
        </>
    )
}