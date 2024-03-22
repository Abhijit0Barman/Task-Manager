import { Routes, Route } from "react-router-dom";
import { TaskList } from "../components/TaskList";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { PrivateRoute } from "../components/PrivateRoute";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/task"
                element={
                    <PrivateRoute>
                        <TaskList />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
