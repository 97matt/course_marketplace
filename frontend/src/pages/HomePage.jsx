import Course from "../components/CourseComponent"
import NavBarComponent from "../components/NavBarComponent"
import FooterComponent from "../components/FooterComponent"
export default function HomePage() {
    return (
        <>
            <NavBarComponent />
            <div className="row m-0 p-1" style={{ height: "150px" }}>
                <div className="col-9 bg-secondary">

                    <h1>name</h1>
                    <h3>text text text text|</h3>
                </div>
                <div className="col-3 bg-warning">
                    <span>img</span>
                    <img src="" alt="" />
                </div>
            </div>
            <div className="row m-auto">
                <div className="col-12">
                    <h2 className="text-center">Popúlar courses</h2>

                </div>
                <div className="col-3">
                    <Course />
                </div>
                <div className="col-3">
                    <Course />
                </div>
                <div className="col-3">
                    <Course />
                </div>
                <div className="col-3">
                    <Course />
                </div>

            </div>
            <FooterComponent />
        </>
    )


}