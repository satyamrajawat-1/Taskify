import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
const initialState = {
    todos:[
        // {
        //     id : nanoid(),
        //     text:"",
        //     status:"Not Started"
        // }
    ]
}
const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo : (state,action)=>{
            const todo = {
                id:action.payload.id,
                text:action.payload.task,
                status:action.payload.status,
                createdAt:action.payload.createdAt
            }
            state.todos.push(todo)
        },
        updateTodo : (state,action)=>{
            const todo = state.todos.find((todo)=>(todo.id === action.payload.id))
            if(todo){
            todo.text = action.payload.text
            if (action.payload.status) todo.status = action.payload.status;
            }
        },
        deleteTodo : (state,action)=>{
            state.todos = state.todos.filter((todo)=>action.payload.id !== todo.id)
        },
        toggleStatus: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id)
            if (todo) {
                todo.status = action.payload.status
            }
        }
    }
})

export default todoSlice.reducer

export const {
    addTodo,
    updateTodo,
    deleteTodo,
    toggleStatus,
} = todoSlice.actions