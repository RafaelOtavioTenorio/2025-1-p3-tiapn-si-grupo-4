import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/app/create");
    }, [navigate]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>404 - Página Não Encontrada</h1>
            <p>Parece que a página <strong>{location.pathname}</strong> não existe ou foi movida.</p>
            <p>Que tal voltar para a <Link to="/app/create">Página Inicial</Link>?</p>
        </div>
    );
}
