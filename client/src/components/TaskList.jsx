import { useEffect, useState } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getAllTask } from "./../redux/taskReducer/action";
import axios from "axios";

export const TaskList = ({ ren }) => {
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
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
    }, [ren,render]);

    const handleDelete = (id) => {
        axios
            .delete(`https://task-manager-virt.onrender.com/api/tasks/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setRender(p=>!p)
            })
            .catch((err) => console.log(err));
    };
    // const handleEdit = (id) => {};

    return (
        <div className="bg-[#5734E4] m-auto text-center rounded p-3 w-[500px] max-h-dvh">
            <h1 className="text-white font-bold text-center text-[20px]">
                Task List
            </h1>
            {isLoading && <p>Loading...</p>}
            <ul>
                {tasks.length>0 && tasks?.map((item) => (
                    <li className="m-[20px] bg-slate-50" key={item._id}>
                        <h2>Title: {item.title}</h2>
                        <p>Description: {item.description}</p>
                        <div className="flex gap-6 items-start justify-around py-3">
                            <button
                                onClick={() => handleEdit(item._id)}
                                className="bg-[blue] w-20 p-1 text-white hover:bg-[yellow] hover:text-[black]"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-[red] w-20 p-1 text-white hover:bg-[yellow] hover:text-[black]"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
