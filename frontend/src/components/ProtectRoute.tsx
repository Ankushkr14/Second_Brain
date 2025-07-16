import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const currentPath = location.pathname;

        const authPages = ["/signup", "/signin"];
        const protectedPages = ["/dashboard"];


        if (token) {
            if (authPages.includes(currentPath)) {
                navigate("/dashboard");
            }
        } else {
            if (protectedPages.some(route => currentPath.startsWith(route))) {
                navigate('/signin', { replace: true });
            }
        }
    }, [location.pathname, navigate]);
};
