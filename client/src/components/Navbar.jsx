import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginFailure,
  loginRequest,
  logoutSuccess,
} from "../redux/authentication/action";

const url = "https://task-manager-virt.onrender.com/api/users/logout";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuth, isLoading, isError, token } = useSelector((store) => {
    return {
      isAuth: store.authReducer.isAuth,
      isLoading: store.authReducer.isLoading,
      isError: store.authReducer.isError,
      token: store.authReducer.token,
    };
  }, shallowEqual);

  const handleLogout = () => {
    dispatch(loginRequest());
    axios
      .get(url)
      .then((res) => {
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailure());
      });
  };
  return (
    <div className="flex gap-4 bg-[#572EE4] text-white px-4 py-2 justify-around">
      <Link
        className="hover:text-yellow-300 text-white font-bold text-[20px]"
        to="/"
      >
        Homepage
      </Link>
      <Link
        className="hover:text-yellow-300 text-white font-bold text-[20px]"
        to="/task"
      >
        TaskList
      </Link>
      {isAuth ? (
        <button
          onClick={handleLogout}
          className="hover:text-yellow-300 text-white font-bold text-[20px]"
        >
          Logout
        </button>
      ) : (
        <Link
          className="hover:text-yellow-300 text-white font-bold text-[20px]"
          to="/login"
        >
          Login
        </Link>
      )}
      <Link
        className="hover:text-yellow-300 text-white font-bold text-[20px]"
        to="/signup"
      >
        SignUp
      </Link>
    </div>
  );
};
