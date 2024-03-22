import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const auth = useSelector((s) => s.authReducer.isAuth);
    console.log(`Authentication :-`, auth);
    return auth ? children : <Navigate to={"/login"} />;
};
