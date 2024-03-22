import { NET_FAILURE, NET_REQUEST, POST_SUCCESS } from "./../actionTypes";

export const loginRequest = () => {
    return { type: NET_REQUEST };
};
export const loginSuccess = (payload) => {
    return { type: POST_SUCCESS, payload };
};
export const loginFailure = () => {
    return { type: NET_FAILURE };
};
