import axios from 'axios';
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const Card = ({flag,toggleState,data,setupdatedData}) => {
    // const data=[
    //     {
    //       title: "Reading",
    //       description:"The internet is filled with stunning Ghibli-inspired images, and many users are eager to try creating their own",
    //       status: "Complete"
    //     },
    //     {
    //       title: "Reading",
    //       description:"The internet is filled with stunning Ghibli-inspired images, and many users are eager to try creating their own",
    //        status: "Complete"
    //     },
    //     {
    //       title: "Reading",
    //       description:"The internet is filled with stunning Ghibli-inspired images, and many users are eager to try creating their own",
    //        status: "In Complete"
    //     },
    //     {
    //       title: "Reading",
    //       description:"The internet is filled with stunning Ghibli-inspired images, and many users are eager to try creating their own",
    //        status: "Complete"
    //     },
    //     {
    //       title: "Reading",
    //       description:"The internet is filled with stunning Ghibli-inspired images, and many users are eager to try creating their own",
    //        status: "In Complete"
    //     }
    //   ]
    const headers={
      id:localStorage.getItem("id"),
      authorisation:`bearer ${localStorage.getItem("token")}`,
    };

    const handlecompleteTask=async (id)=>{  
      try{
        const response=await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`,
          {},
          {headers}
        );
        alert(response?.data?.message);
      }catch(err){
        console.log(err.message);
      }
    }

    const handleImportant=async (id)=>{
      try{
        const response=await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`,
          {},
          {headers}
        );
      
        // alert(response?.data?.message);
      }catch(err){
        console.log(err.message);
      }
    }

    const deleteTask=async (id)=>{
      try{
        const response=await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`,
          {headers}
        );
        alert(response?.data?.message);
      }catch(err){
        console.log(err.message);
      }
    }
    
    const handleUdpate=(id,title,desc)=>{
      toggleState();
      setupdatedData({id: id,title: title,desc: desc});
    }


  return (
    <div className='grid grid-cols-4 gap-4 p-4'>{
        data && data.map((a,i)=>(
            <div className='rounded-sm p-4 bg-gray-800 justify-between flex flex-col w-auto' key={i}>
                <div>
                <h3 className=' text-xl font-semibold text-amber-50 '>{a.title}</h3>
                <p className='text-gray-300 my-2' >{a.desc}</p>
                </div>
                <div className='mt-4 w-full flex items-center'>
                   
                    <button className={`${a.complete === false ? "bg-red-400" : "bg-green-600"}
                     p-2 rounded w-3/6`} onClick={()=>handlecompleteTask(a._id)}> {a.complete===true? "Completed" :"In Completed"} </button>

                    
                    <div className='w-3/6 text-white p-2 text-2xl font-semibold flex justify-between'>
                    <button onClick={()=>handleImportant(a._id)}>{a.important===false?<CiHeart /> :<FaHeart className='text-red-500' />}
                    </button>
                    {flag !=="false" && <button onClick={()=>handleUdpate(a._id,a.title,a.desc)}><FaRegEdit /></button>}
                    <button onClick={()=>deleteTask(a._id)}><MdDelete /></button>
                    </div>
                </div>
            </div>))
        }
        
        {flag==="true" && (<div className='rounded-sm p-4 bg-gray-800 
         text-white font-semibold flex flex-col justify-center items-center 
         hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={toggleState} >
                <MdAddCircleOutline className='text-5xl' />
                <h2 className='text-2xl mt-4'>Add Task</h2> 
        </div>)
        }
    </div>
  )
}

export default Card