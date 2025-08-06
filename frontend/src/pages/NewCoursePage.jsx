import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import NewCoursecomponent from "../components/NewCourseComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function NewCoursePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/home')
    })
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBarComponent />

            <main className="flex-grow-1" style={{ marginTop: "8%" }}>
                <NewCoursecomponent />
            </main>

            <FooterComponent />
        </div>
    )
}