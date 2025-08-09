const router= require("express").Router();
const Task=require("../models/task");
const User=require("../models/user");
const {authenticateToken}= require("./auth");

//create task
router.post("/create-task", authenticateToken,async(req,res)=>{
    try{
        const {title,desc}=req.body;
        const {id}=req.headers;
        const newTask=new Task({title:title, desc:desc});
        const saveTask=await newTask.save();
        const taskId=saveTask._id;
        await User.findByIdAndUpdate(id,{$push :{tasks:taskId}});
        res.status(200).json({message:"'Task Created Successfuly"});
    }catch(err){
        // throw new Error({message:err.message})
        res.status(400).json({message:"Internal Server Error"});
    }

})

// get all tasks
router.get("/get-all-tasks",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const userData= await User.findById(id).populate({
            path:"tasks",
            options:{sort:{updateAt:-1}},
        });
        res.status(200).json({data:userData});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

//delete task
router.delete("/delete-task/:id",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull :{tasks:id}});
        res.status(200).json({message: "Task deleted successfully"});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

//update task
router.put("/update-task/:id",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.params;
        const {title, desc}=req.body;
        await Task.findByIdAndUpdate(id,{title:title,desc:desc});

        res.status(200).json({message: "Task updated successfully"});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

// update important status
router.put("/update-imp-task/:id",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.params;
        
        const TaskData=await Task.findById(id);
        const impTask=TaskData.important;
        await Task.findByIdAndUpdate(id,{important: !impTask});

        res.status(200).json({message: (!impTask)?"Task added to Important":"Task Removed from important"});
    }catch(err){
        
        res.status(400).json({message:"Internal Server Error"});
    }
})

router.put("/update-complete-task/:id",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.params;
        
        const TaskData=await Task.findById(id);
        const completeTask=TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete: !completeTask});

        res.status(200).json({message: (!completeTask)?"Task marked completed":"Task marked incomplete"});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

//get all important task
router.get("/get-imp-tasks",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{important: true},
            options:{sort:{updateAt:-1}},
        });
        res.status(200).json({data:Data.tasks});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

//get all completed task
router.get("/get-completed-tasks",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{complete: true},
            options:{sort:{updateAt:-1}},
        });
        res.status(200).json({data:Data.tasks});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})

//get all completed task
router.get("/get-incomplete-tasks",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{complete: false},
            options:{sort:{updateAt:-1}},
        });
        res.status(200).json({data:Data.tasks});
    }catch(err){
        res.status(400).json({message:"Internal Server Error"});
    }
})


module.exports=router;
