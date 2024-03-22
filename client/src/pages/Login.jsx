import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
} from "../redux/authentication/action";
import axios from "axios";

const url = "https://reqres.in";

export const Login = () => {
    const [data, setData] = useState({
        // email: "eve.holt@reqres.in",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest());
        axios
            .post(`${url}/api/login`, data)
            .then((res) => {
                console.log(res.data.token);
                dispatch(loginSuccess(res.data.token));
            })
            .catch((err) => {
                console.log(err);
                dispatch(loginFailure());
            });
        setData({ email: "", password: "" });
    };

    return (
        <div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
            />
            <button disabled={!data.email || !data.password} onClick={handleSubmit}>Submit</button>
        </div>
    );
};
