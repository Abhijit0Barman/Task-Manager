import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskReducer/action";
import { useSelector } from "react-redux";

export const TaskInput = ({setRen}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((s) => s.authReducer.token);

    const handleAddTask = () => {
        let obj = { title, description };
        dispatch(addTask(obj,token));
        setTitle("");
        setDescription("");
        setRen(p=>!p)
    };

    return (
        <div className="bg-[#5734E4] m-auto text-center rounded p-3 w-[500px] h-[200px]">
            <p className="text-white font-bold text-center text-[20px]">
                Enter Task
            </p>
            <div className="m-[20px]">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                />
            </div>
            <div>
                {" "}
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                />
            </div>
            <button
                className="mt-[20px] bg-orange-500 px-5 py-2 rounded-xl text-white"
                onClick={handleAddTask}
            >
                Add Task
            </button>
        </div>
    );
};
