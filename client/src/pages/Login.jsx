import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const isLogin = useSelector((store) => store.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState({ username: "", password: "" });

  if (isLogin) navigate("/");

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://task-manager-65ay.onrender.com/api/v1/log-in",
          // https://task-manager-65ay.onrender.com
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response?.data?.id);
        localStorage.setItem("token", response?.data?.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (err) {
      // console.log(err);
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className="h-[89vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="textt-2xl font-semibold text-white flex justify-center">
          Login
        </div>
        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="username"
          onChange={change}
          value={Data.username}
          required
        />

        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="password"
          onChange={change}
          value={Data.password}
          required
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 hover:bg-blue-500 font-semibold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            Login
          </button>
          <Link to={"/signup"} className="text-gray-200 hover:text-blue-500">
            Not having an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
