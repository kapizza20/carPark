import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ dozvola }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
      dozvola?.find(e=>e===auth?.IDPrivilegije)
            ? <Outlet />
            : auth?.Username
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;