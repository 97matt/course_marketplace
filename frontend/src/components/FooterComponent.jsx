export default function FooterComponent() {
    return (
        <footer
            className="bg-secondary text-white text-center py-2"
            style={{ fontSize: '0.85rem', position: 'fixed', bottom: 0, left: 0, width: '100%' }}
        >
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="mb-1 mb-md-0">
                    <strong>Contacto:</strong> +56 9 1234 5678 | contacto@ejemplo.com
                </div>
                <div className="mb-1 mb-md-0">
                    <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
                </div>
                <div>
                    © 2025 Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
}

