import { Routes, Route } from "react-router-dom";
// import { TaskList } from "../components/TaskList";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { PrivateRoute } from "../components/PrivateRoute";
import { Signup } from "./Signup";
import { UserList } from "./UserList";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Homepage />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/user"
                element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
