import { Link } from "react-router-dom"


export default function NavBarComponent() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" href="#">Name</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/courses" className="nav-link" href="#">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" href="#">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}