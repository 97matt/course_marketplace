import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function NavBarComponent() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const getLinkClass = (...paths) => {
        return paths.includes(location.pathname) ? 'nav-link active' : 'nav-link';
    };

    const handleOnClick = () => {
        logout()
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow fixed-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><b>Course Marketplace</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">
                        {
                            user && (
                                <li className="nav-item">
                                    <Link className={'nav-link active text-black me-5'} aria-current="page">Hola, {user.user_first_name} {user.user_last_name}</Link>
                                </li>
                            )
                        }

                        <li className="nav-item">
                            <Link to="/" className={getLinkClass('/home')} aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/courses" className={getLinkClass('/courses', '/courses/new')}>Courses</Link>
                        </li>
                        {
                            user && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/profile"
                                            className={getLinkClass('/profile', '/profile/edit')}>
                                            Perfil
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" onClick={handleOnClick}>Logout</Link>
                                    </li>
                                </>
                            )

                        }
                        {
                            !user && (
                                <li className="nav-item">
                                    <Link to="/login" className={getLinkClass('/login', '/register')} href="#">Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}