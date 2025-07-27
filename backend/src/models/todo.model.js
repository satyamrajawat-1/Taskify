import mongoose, { Schema } from "mongoose";
 const todoSchema = new mongoose.Schema(
    {
        owner:{
            type : Schema.Types.ObjectId,
            ref : 'User'
        },
        task:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        status:{
            type:String,
            enum : ['completed' , 'started' , 'notStarted'],
            default:'started'
        }
    },
    {timestamps:true}
)

export const Todo = mongoose.model('Todo', todoSchema);