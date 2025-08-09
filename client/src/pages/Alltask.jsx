import React, { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { MdAddCircleOutline } from "react-icons/md";
import InputData from '../components/InputData.jsx';
import axios from 'axios';

export const Alltask = () => {

  const [addTask,setaddTask]=useState(false);
  const [Data,setData]=useState();
  const [UpdatedData,setupdatedData]=useState({id:"",
    title:"",
    desc:""
  });

  const toggleState=()=>{
    setaddTask(!addTask);
  }

  const headers={
    id:localStorage.getItem("id"),
    authorisation:`bearer ${localStorage.getItem("token")}`,
  };

  const fetch=async ()=>{
    const response= await axios.get("https://task-manager-65ay.onrender.com/api/v2/get-all-tasks",{headers});
    setData(response?.data?.data);
  }
  
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  });
// removed dependency array
  // Data && console.log(Data);
  return (
    <>
      <div className='w-full flex justify-end px-4 py-2'>
        <button className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' onClick={toggleState}><MdAddCircleOutline /></button>
      </div>
      {Data && <Card flag={"true"} toggleState={toggleState} data={Data.tasks} setupdatedData={setupdatedData}/>}
      {addTask && <div><InputData toggleState={toggleState} setaddTask={setaddTask}
       UpdatedData={UpdatedData} 
       setupdatedData={setupdatedData}/>
       </div>}
    </>
  )
}
export default Alltask;

// "mongodb+srv://suunnyshekhar:csFBRHuIDBjVn7ah@user.n07ug.mongodb.net/devTinder"
