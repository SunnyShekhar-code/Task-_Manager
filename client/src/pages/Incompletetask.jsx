import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Incompletetask = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorisation: `bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    const response = await axios.get(
      "https://task-manager-65ay.onrender.com/api/v2/get-incomplete-tasks",
      { headers }
    );
    setData(response?.data?.data);
  };

  useEffect(() => {
    fetch();
  });

  return (
    <div>
      <Card flag={"false"} data={Data} />
    </div>
  );
};

export default Incompletetask;
