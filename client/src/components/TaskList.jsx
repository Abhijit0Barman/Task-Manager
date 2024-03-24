import { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getAllTask } from "./../redux/taskReducer/action";

export const TaskList = ({ren}) => {
    const dispatch = useDispatch();

    const { tasks, isLoading, token } = useSelector((store) => {
        return {
            tasks: store.taskReducer.tasks,
            isLoading: store.taskReducer.isLoading,
            token: store.authReducer.token,
        };
    }, shallowEqual);

    // let localToken=localStorage.getItem(token)

    // const getTask = (x) => {
    //     // dispatch(netRequest());
    //     axios
    //         .get(
    //             URL,
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             },
    //             x
    //         )
    //         .then((res) => {
    //             console.log(res.data);
    //             // dispatch(getSuccess(res.data));
    //         })
    //         .catch((err) => {
    //             // dispatch(netFailure());
    //             console.log(err);
    //         });
    // };

    useEffect(() => {
        dispatch(getAllTask(token));
        // getTask();
    }, [ren]);

    return (
        <div className="bg-[#5734E4] m-auto text-center rounded p-3 w-[500px] max-h-dvh">
            <h1 className="text-white font-bold text-center text-[20px]">
                Add Task
            </h1>
            {isLoading && <p>Loading...</p>}
            <ul>
                {tasks?.map((item) => (
                    <li className="m-[20px] bg-slate-50" key={item._id}>
                        <h2>Title: {item.title}</h2>
                        <p>Description: {item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
