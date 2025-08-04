export default function FooterComponent() {
    return (
        <footer
            className="text-white text-center py-4"
            style={{ backgroundColor: "#343a40", fontSize: "0.9rem" }}
        >
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

                <div className="mb-3 mb-md-0 text-md-start">
                    <h6 className="mb-1 fw-bold">Contáctanos</h6>
                    <div>Teléfono: +56 9 8456 2371</div>
                    <div>Email: contacto@miempresa.cl</div>
                </div>

                <div className="mb-3 mb-md-0">
                    <h6 className="mb-1 fw-bold">Síguenos en redes sociales</h6>
                    <a href="https://facebook.com/miempresa" target="_blank" className="text-white me-3" rel="noreferrer">
                        <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a href="https://instagram.com/miempresa.oficial" target="_blank" className="text-white me-3" rel="noreferrer">
                        <i className="bi bi-instagram fs-4"></i>
                    </a>
                    <a href="https://twitter.com/miempresa_cl" target="_blank" className="text-white me-3" rel="noreferrer">
                        <i className="bi bi-twitter-x fs-4"></i>
                    </a>
                    <a href="https://linkedin.com/company/miempresa" target="_blank" className="text-white" rel="noreferrer">
                        <i className="bi bi-linkedin fs-4"></i>
                    </a>
                </div>

                <div className="text-md-end">
                    <h6 className="mb-1 fw-bold">Sobre nosotros</h6>
                    <p className="mb-1">
                        En MiEmpresa creemos en la educación accesible, moderna y de calidad.
                    </p>
                    <div>© 2025 MiEmpresa. Todos los derechos reservados.</div>
                </div>

            </div>
        </footer>
    );
}
