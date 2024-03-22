import { useEffect, useState } from "react";
import { useDispatch,shallowEqual,useSelector } from "react-redux";
import { netFailure, netRequest } from './../redux/tasks/action';
import axios from "axios";
import { TaskInput } from "./TaskInput";

const URL=""

export const TaskList = () => {
    const [page, setPage] = useState(1);
    const [render, setRender] = useState(true);
    const [limit, setLimit] = useState(10);
    const dispatch = useDispatch();

    const { tasks, isLoading, isError } = useSelector((store) => {
        return {
            tasks: store.taskReducer.tasks,
            isLoading: store.taskReducer.isLoading,
            isError: store.taskReducer.isError,
        };
    }, shallowEqual);

    const getTask=(paramObj)=>{
        dispatch(netRequest())
        axios.get(`${URL}/tasks`,paramObj).then(res=>{
            dispatch(getTask(res.data))
        }).catch(err=>{
            dispatch(netFailure())
            console.log(err);
        })
    }
    useEffect(()=>{
        const paramObj={
            params:{
                _page:page,
                _limit:limit,
            },
        }
        getTask(paramObj)
    },[page,limit])

    const paginate=(pageNo)=>{
        setPage(pageNo)
    }

    return (
        <>
        <h1>Add Task</h1>
        <TaskInput setRender={setRender}/>
        {
            isLoading && <p>Loading...</p>
        }
        {
            tasks?.map((item)=>{
                return (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                )
            })
        }
        <div>
            <button onClick={()=>paginate(1)}>1</button>
        </div>
        </>
    )
};
