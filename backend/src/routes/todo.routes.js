import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { deleteTodo, getAllTodos, updateTodo, uploadTodo } from "../controllers/todo.controllers.js";
const router = Router()

router.route('/add-todo').post(verifyJwt,uploadTodo)

router.route('/update-todo/:todoId').post(verifyJwt,updateTodo)

router.route('/delete-todo/:todoId').post(verifyJwt,deleteTodo)

router.route('/get-todo').get(verifyJwt,getAllTodos)
export default router