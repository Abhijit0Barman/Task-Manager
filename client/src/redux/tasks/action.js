
import { NET_REQUEST,NET_FAILURE, GET_SUCCESS, POST_SUCCESS } from '../actionTypes';

export const netRequest=()=>{
    return {type:NET_REQUEST}
}
export const netFailure=()=>{
    return {type:NET_FAILURE}
}
export const getSuccess=(payload)=>{
    return {type:GET_SUCCESS,payload:payload}
}
export const postSuccess=(payload)=>{
    return {type:POST_SUCCESS,payload:payload}
}
