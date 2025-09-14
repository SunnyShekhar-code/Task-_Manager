const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const userAPI= require("./routes/user");
const taskAPI=require("./routes/task");
// app.use(cors(
//     {
//         credentials:true,
//         origin:"http://localhost:5173/"
//     }
// ));

app.use("/",(req,res)=>{
    res.send("Hii from backend server");
})

app.use(cors({
  origin: ["https://localhost:5173", "https://task-manager-zjff.vercel.app"],
  credentials: true
}));

app.use(express.json());


const {conn}=require("./conn");


app.use("/api/v1",userAPI);
app.use("/api/v2",taskAPI);
//localhost:1000/api/v1/sign-in

// app.use("/",(req,res)=>{
//     res.send("Hii from backend server");
// })

// if routing method is not matched perfectly it will go to below route like searching for "delete" but got "post"
const PORT=1000;
conn()
app.listen(PORT,()=>{
    console.log("Server Started");
})