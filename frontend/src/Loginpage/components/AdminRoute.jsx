import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/login-admin" />;
    }

    const user = JSON.parse(atob(token.split(".")[1]));

    return user.isAdmin ? children : <Navigate to="/home" />;
};

export default AdminRoute;
