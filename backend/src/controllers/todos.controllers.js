import { database } from "../db/database.js";
export const ctrl = {};

//Obtener todas las tareas
ctrl.getAllTodos = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo) => todo.owner === req.user.id);
  try {
    res.json({ todos });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

//crear una nueva tarea
ctrl.createTodoByOwner = (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: false,
    owner: req.user.id,
  };

  try {
    database.todos.push(newTodo);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la tarea" });
  }

  res.json({ message: "Tarea creada exitosamente", todo: newTodo });
};

//editar tarea
ctrl.editTodo = (req, res) => {
  const todo = database.todos.find((todo) => todo.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  if (todo.owner !== req.user.id) {
    return res
      .status(403)
      .json({ message: "No tienes permisos para editar esta tarea" });
  }
  todo.title = req.body.title;
  res.json({ message: "Tarea editada exitosamente", todo });
};

//borrar tarea
ctrl.deleteTodo = (req, res) => {
  const todoIndex = database.todos.findIndex(
    (todo) => todo.owner === req.user.id
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  if (database.todos[todoIndex].owner !== req.user.id) {
    return res
      .status(403)
      .json({ message: "No tienes permisos para eliminar esta tarea" });
  }
  database.todos.splice(todoIndex, 1);
  res.json({ message: "Tarea eliminada exitosamente" });
};
