import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((store) => store.auth.isLoggedIn);
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  if (isLogin) navigate("/");

  const submit = async (e) => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className="h-[89vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="textt-2xl font-semibold text-white flex justify-center">
          Signup
        </div>
        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          onChange={change}
          value={Data.username}
        />
        <input
          type="email"
          placeholder="email id"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          required
          onChange={change}
          value={Data.email}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          required
          onChange={change}
          value={Data.password}
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 font-semibold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            Signup
          </button>
          <Link to={"/login"} className="text-gray-200 hover:text-blue-500">
            Already have account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
