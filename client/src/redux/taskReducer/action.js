import axios from "axios";
import { GET_REQUEST, GET_SUCCESS, POST_FAILURE, POST_REQUEST, POST_SUCCESS } from "../actionTypes";

export const getAllTask = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST });
        let res = await axios.get(`https://task-manager-virt.onrender.com/api/tasks`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data);
        dispatch({ type: GET_SUCCESS, payload: res.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: POST_FAILURE });
    }
};

//Delete Task

// export const deleteTaskFunc = (id, token) => async (dispatch) => {
//     try {
//         dispatch({ type: DELETELOADING });
//         let res = await axios.delete(
//             `${process.env.REACT_APP_API_URL}/api/task/${id}`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         dispatch({ type: DELETESUCESS, payload: id });
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: DELETEFAIL });
//     }
// };

export const addTask = (data, token) => async (dispatch) => {
    try {
        dispatch({ type: POST_REQUEST });
        let res = await axios.post(
            `https://task-manager-virt.onrender.com/api/tasks`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res);
        dispatch({ type: POST_SUCCESS, payload: res.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: POST_FAILURE });
    }
};

// //edit Task
// export const EditTaskFunc =
//     (id, formData, closeModal, token) => async (dispatch) => {
//         try {
//             dispatch({ type: EDITLOADING });
//             let res = await axios.patch(
//                 `${process.env.REACT_APP_API_URL}/api/task/${id}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             dispatch({ type: EDITSUCESS, payload: res.data.singleTask });
//             closeModal();
//         } catch (error) {
//             console.log(error);
//             dispatch({ type: EDITFAIL });
//             closeModal();
//         }
//     };
