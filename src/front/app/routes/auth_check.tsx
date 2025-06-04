import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AuthCheck() {
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const userData = localStorage.getItem("userData")

        if (!token) {
            navigate("/login")
        }

        navigate("/app")
    }, [navigate]);

    return <div>Loading...</div>

}