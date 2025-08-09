import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar=()=>{
    const data=[
        {
          title:"All Task",
          icon:<CgNotes />,
          link:"/"
        },
        {
          title:"Important Task",
          icon :<MdLabelImportant />,
          link:"/importantTask"
        },
        {
          title:"Completed Task",
          icon:<FaCheckToSlot />,
          link:"/completedTask"
        },
        {
          title:"Incomplete Task",
          icon: <TbNotebookOff />,
          link:"/incompleteTask"
        }
    ]

    const [Data,setData]=useState();
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const submit=()=>{
      dispatch(authActions.logout());
      localStorage.clear("id");
      localStorage.clear("token");
      navigate("/login");
    }

    const headers={
      id:localStorage.getItem("id"),
      authorisation:`bearer ${localStorage.getItem("token")}`,
    };

    const fetch=async ()=>{
      const response= await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
      // console.log(response);
      setData(response?.data?.data);
    }
    
    useEffect(()=>{
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
      }
     
    },[]);

    return (
        
        <>  {
            Data && (<div>
            <h2 className="text-2xl">{Data.username}</h2>
            <h3 className="text-gray-400 my-2">{Data.email}</h3>
            <hr />
            </div>)}
            
           
            <div className="justify-between" >
                {
                    data.map((task,i)=>
                    <Link to={task.link} className="my-2 flex items-center hover:bg-gray-800 rounded-md p-2 transition-all duration-3" key={i}>
                        {task.icon}{task.title}
                    </Link>)
                }
            </div>
            <div><button className=" bg-violet-500 border border-black rounded-md p-2 w-full hover:bg-violet-700" onClick={submit}>Log out</button></div>
            
        </>
        
    )
}

export default Sidebar