import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";

const InputData = ({toggleState,UpdatedData ,setupdatedData}) => {
  const [Data,setData]=useState({title:"",desc:""});

  const headers={
    id:localStorage.getItem("id"),
    authorisation:`bearer ${localStorage.getItem("token")}`,
  };

  const change=(e)=>{
    const {name, value}=e.target;
    setData({...Data,[name]:value});
  }
  const submitData=async()=>{
    try{
    if(Data.title==="" || Data.desc===""){
      alert("All fields are required");
    }else{
      const response=await axios.post("https://task-manager-65ay.onrender.com/api/v2/create-task",Data,{headers});
      alert(response.data.message);
      setData({title:"", desc:""});
      toggleState();
    }
  }catch(err){
    console.log(err.message);
  }
  }

  const updateData=async()=>{
    try{
      if(Data.title==="" || Data.desc===""){
        alert("All fields are required");
      }else{
        const response=await axios.put(`https://task-manager-65ay.onrender.com/api/v2/update-task/${UpdatedData.id}`,Data,{headers});
        alert(response.data.message);
        toggleState();
        setupdatedData({id:"",title:"",desc:""});
        setData({title:"", desc:""});
      }
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    setData({title:UpdatedData.title, desc:UpdatedData.desc});
  },[UpdatedData]);


  return (
   <>
    <div className={'${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full'}></div>
    <div className='${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full'></div>
    <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-full'>
      
      <div className='w-2/6 bg-gray-900 p-4 rounded'>
        <div className='text-xl text-white flex justify-end pb-2'>
        <button className='hover:text-cyan-200' onClick={()=>{ 
          toggleState();
          setData({title:"", desc:""});
          setupdatedData({id:"",title:"",desc:""});
          
          }}>
          <RxCross1/>
          </button>
        </div>
            <input type="text"
            placeholder='Title'
            name='title'
            value={Data.title}
            onChange={change}
            className='px-3 py-2 rounded w-full bg-gray-700 text-gray-100' />

            <textarea name="desc" col="30" 
            type="text"
            rows="10" placeholder='Description..' 
            value={Data.desc}
            className='px-3 py-2 w-full rounded bg-gray-700 my-3 text-gray-300 font-semibold'
            onChange={change}>
            </textarea>
            { UpdatedData.id===""?
            (<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={submitData}> Submit</button>)
            :(<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={updateData}> Update</button>)}
     </div>
   </div>
    </>
  )
}

export default InputData