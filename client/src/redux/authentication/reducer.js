import { getAuthLocal, setAuthLocal } from "../../utils/saveLocalStorage";
import { NET_FAILURE, NET_REQUEST, POST_SUCCESS,LOGOUT_SUCCESS } from "../actionTypes";

const initialState = {
    isAuth: getAuthLocal() || false,
    isLoading: false,
    isError: false,
    token: null,
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NET_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case NET_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case POST_SUCCESS:{
            setAuthLocal(true);
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                token:payload,
            };
        }
        case LOGOUT_SUCCESS:{
            // localStorage.removeItem("token");
            setAuthLocal(false)
            return {
                ...state,
                isAuth: false,
                token: null
            }
        }
        default: {
            return state;
        }
    }
};
