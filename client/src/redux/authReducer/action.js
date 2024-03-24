import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../actionTypes";

export const login = (data) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post("https://task-manager-virt.onrender.com/api/users/login", data)
    .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data.token }))
    .catch(() => dispatch({ type: LOGIN_FAILURE }));
};


export const signup = (data) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  return axios
    .post("https://task-manager-virt.onrender.com/api/users/register", data)
    .then((res) => dispatch({ type: SIGNUP_SUCCESS, payload: res.data }))
    .catch(() => dispatch({ type: SIGNUP_FAILURE }));
};
