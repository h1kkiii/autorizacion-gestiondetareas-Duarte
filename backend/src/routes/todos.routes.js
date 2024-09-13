import { Router } from "express";
import { ctrl } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, ctrl.getAllTodos);
todosRouter.post("/", validarJwt, ctrl.createTodoByOwner);

export { todosRouter };
