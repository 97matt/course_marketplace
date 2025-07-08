export default function CourseComponent() {
    return (
        <div className="card shadow-sm m-3" style={{ width: "18rem" }}>
            <img
                src="https://via.placeholder.com/288x162"
                alt="Curso"
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className="card-title">Curso de React</h5>
                <p className="card-text">
                    Aprende a construir interfaces modernas con React y Bootstrap.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">$49.99</span>
                    <button className="btn btn-primary btn-sm">Agregar</button>
                </div>
            </div>
        </div>
    );
}
