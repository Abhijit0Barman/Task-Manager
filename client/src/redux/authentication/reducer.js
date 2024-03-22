import { getAuthLocal, setAuthLocal } from "../../utils/saveLocalStorage";
import { NET_FAILURE, NET_REQUEST, POST_SUCCESS } from "../actionTypes";

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
        case POST_SUCCESS:
            setAuthLocal(true);
            return {
                ...state,
                isLoading: false,
                tasks: payload,
                isAuth: true,
            };
        // case LOGOUT:
        //     setAuthLocal(false)
        //     return {
        //       ...state,
        //         isAuth: false,
        //         token: null
        //     }
        default: {
            return state;
        }
    }
};
