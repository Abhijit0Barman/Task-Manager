import { useState } from "react";
import { useDispatch } from "react-redux";
import { netFailure, netRequest, postSuccess } from "../redux/tasks/action";
import axios from "axios";

const url = "";

export const TaskInput = ({ setRender }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const handleAddTask = () => {
        addTask();
        setTitle("");
        setDescription("");
    };
    const addTask = () => {
        dispatch(netRequest());
        axios
            .post(`${url}/tasks`, { title, description })
            .then((res) => {
                dispatch(postSuccess(res.data));
                setRender((p) => !p);
            })
            .catch((err) => {
                dispatch(netFailure());
                console.log(err);
            });
    };
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};
