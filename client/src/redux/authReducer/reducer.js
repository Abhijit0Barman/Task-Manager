// import { getAuthLocal, setAuthLocal } from "../../utils/saveLocalStorage";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from "../actionTypes";

const initialState = {
    // isAuth: getAuthLocal() || false,
    isAuth: false,
    isLoading: false,
    isError: false,
    token: "",
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true };

        case LOGIN_FAILURE: {
            return { ...state, isLoading: false, isError: true };
        }

        case LOGIN_SUCCESS: {
          console.log(payload);
            return { ...state, isLoading: false, isAuth: true, token: payload };
        }
        case SIGNUP_REQUEST:
            return { ...state, isLoading: true };

        case SIGNUP_FAILURE: {
            return { ...state, isLoading: false, isError: true };
        }

        case SIGNUP_SUCCESS: {
          console.log(payload);
            return { ...state, isLoading: false, isAuth: true };
        }

        default: {
            return state;
        }
    }
};
