import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector,shallowEqual } from "react-redux";

export const UserList = () => {
    const [userList, setUserList] = useState([]);
    const token = useSelector((s) => s.authReducer.token,shallowEqual);
    
    useEffect(() => {
        const getAllUser = async () => {
            try {
                let res = await axios.get(
                    "https://task-manager-virt.onrender.com/api/users",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserList(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllUser();
    }, []);
    console.log(userList);
    return (
        <div className="w-dvw">
            <ul className=" text-center">
                {userList?.map((item) => (
                    <li className="m-[10px] p-[10px] bg-sky-400" key={item._id}>
                        <p> Name: {item.username}</p>
                        <p> Email: {item.email}</p>
                        <p> Id: {item._id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
