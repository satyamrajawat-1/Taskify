import { asyncHandler } from "../utility/AsyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from '../utility/ApiResponse.js'
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

const uploadTodo = asyncHandler(async (req, res) => {
    const { task } = req.body
    if (!task) {
        throw new ApiError(400, "task is required")
    }
    
    const user = req.user._id

    const existingTodo = await Todo.findOne({ task, owner: user });
    if (existingTodo) {
        throw new ApiError(400, "You already created this task.");
    }

    const todo = await Todo.create({
        task,
        owner: user
    })
    res.status(200).json(new ApiResponse(200, todo, "todo Created successfully"))
})

const deleteTodo = asyncHandler(async(req,res)=>{
    const {todoId} = req.params
    const user = req.user._id
   const deletedTodo = await Todo.findOneAndDelete({$and:[{_id:todoId},{owner:user}]},{projection:{task:1}})
   if(!deletedTodo){
    throw new ApiError(400,"Unable to delete todo")
   }
    res.status(200).json(new ApiResponse(200,deletedTodo,"Todo deleted successfully"))
})

const updateTodo = asyncHandler(async(req,res)=>{
    const user = req.user._id
    const {todoId} = req.params
    const{task , status} = req.body
    if(!task && !status){
        throw new ApiError(400,"fields are required")
    }
    const todo = await Todo.findOne({$and:[{_id:todoId},{owner:user}]})
    if (!todo) {
    throw new ApiError(404, "Todo not found or unauthorized");
  }
    todo.task = task || todo.task
    todo.status = status || todo.status
    const updatedTodo = await todo.save({validateBeforeSave:false})
    if(!updatedTodo){
        throw new ApiError(400,"Todo not updated")
    }
    res.status(200).json(new ApiResponse(200,updatedTodo,"todo updated successfully"))
})

const getAllTodos = asyncHandler(async(req,res)=>{
    const{page=1 , limit = 10 , sortBy = "createdAt" , status = "" , sortType = "desc" ,userId} = req.query
    const matchStage = {owner:new mongoose.Types.ObjectId(userId)}
    if(status){
        matchStage.status = status
    }
    const skip = (parseInt(page)-1)*parseInt(limit)
    const sortStage = {[sortBy] : sortType==="desc"?-1:1}

    const todos = await Todo.aggregate([
        {
            $match:matchStage
        },
        {
            $project:{
                task:1,
                status:1,
                createdAt:1
            }
        },
        {$sort:sortStage},
        {$skip:skip},
        {$limit:parseInt(limit)}
    ])
    if(!todos){
        throw new ApiError("no todo found")
    }
    res.status(200).json(new ApiResponse(200,todos,"todos fetched successfully"))
})
export {
    uploadTodo,
    deleteTodo,
    updateTodo,
    getAllTodos
}