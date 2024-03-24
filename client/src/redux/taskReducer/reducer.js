import { GET_SUCCESS, POST_FAILURE, POST_REQUEST, POST_SUCCESS } from "../actionTypes";

const initialState = {
    // tasks: [{"title":"g","description":"hello","_id":"1"}],
    tasks:[],
    isLoading: false,
    isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case POST_REQUEST: {
            return { ...state, isLoading: true };
        }
        case POST_FAILURE: {
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
        // case DELETE_SUCCESS:
        //     let TaskAfterDelete = [...state.tasks].filter(
        //         (el) => el._id !== action.payload
        //     );
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: false,
        //         tasks: TaskAfterDelete,
        //     };
        // case ADDSUCESS:
        //     let TaskAfterAdding = [...state.Tasks, action.payload]; //newly added Task
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: false,
        //         Tasks: TaskAfterAdding,
        //     };
        // case EDITSUCESS:
        //     let EditTask = [...state.Tasks].map((el) => {
        //         if (el._id === action.payload._id) {
        //             return action.payload;
        //         }
        //         return el;
        //     });
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: false,
        //         Tasks: EditTask,
        //     };

        default: {
            return state;
        }
    }
};
