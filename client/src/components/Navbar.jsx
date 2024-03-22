import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="flex justify-around bg-gray-400 px-12 py-6">
            <Link
                className="hover:text-black text-white font-bold text-[20px]"
                to="/"
            >
                Homepage
            </Link>
            <Link
                className="hover:text-black text-white font-bold text-[20px]"
                to="/task"
            >
                TaskList
            </Link>
            <Link
                className="hover:text-black text-white font-bold text-[20px]"
                to="/login"
            >
                Login
            </Link>
        </div>
    );
};
