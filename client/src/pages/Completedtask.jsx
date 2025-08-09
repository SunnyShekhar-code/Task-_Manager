import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios';

const Completedtask = () => {
  const [Data,setData]=useState();
    const headers={
        id:localStorage.getItem("id"),
        authorisation:`bearer ${localStorage.getItem("token")}`,
      };
    
      const fetch=async ()=>{
        const response= await axios.get("http://localhost:1000/api/v2/get-completed-tasks",{headers});
        setData(response?.data?.data);
        // console.log(Data);
      }
      
      useEffect(()=>{
        fetch();
      });

  return (
    <div><Card flag={"false"} data={Data}/></div>
  )
}

export default Completedtask