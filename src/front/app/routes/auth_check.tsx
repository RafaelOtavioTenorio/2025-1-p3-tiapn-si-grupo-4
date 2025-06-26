import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function AuthCheck() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            if (!isAuthenticated()) {
                navigate("/login");
                return;
            }

        } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
            navigate("/login");
        } finally {
            setIsLoading(false);
        }
    };

    checkAuth();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return <Outlet />;
}