import { useState } from "react";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from '../components/TaskList';

export const Homepage = () => {
    const [ren,setRen]=useState(false)
    return (
        <div>
            <br />
            <TaskInput setRen={setRen}/>
            <br />
            <TaskList ren={ren}/>
        </div>
    );
};
