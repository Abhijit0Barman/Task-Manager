import {
    GET_SUCCESS,
    NET_FAILURE,
    NET_REQUEST,
    POST_SUCCESS,
} from "../actionTypes";

const initialState = {
    tasks: [],
    isLoading: false,
    isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NET_REQUEST: {
            return { ...state, isLoading: true };
        }
        case NET_FAILURE: {
            return { ...state, isLoading: false, isError: true };
        }
        case GET_SUCCESS: {
            return { ...state, isLoading: false, tasks: payload };
        }
        case POST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                tasks: payload,
                // tasks: [...state.tasks, payload],
            };
        }

        default: {
            return state;
        }
    }
};
