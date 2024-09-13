import { database } from "../db/database.js";
export const ctrl = {};

//Obtener todas las tareas
ctrl.getAllTodos = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos });
};

//Obtener una tarea por Owner

//crear una nueva tarea
ctrl.createTodoByOwner = (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    owner: req.user.id,
    completed: false,
  };

  database.todos.push(newTodo);

  res.json({ message: "Tarea creada exitosamente", todo: newTodo });
};
