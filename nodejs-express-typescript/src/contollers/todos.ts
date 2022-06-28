import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.json({ message: "Created the todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const patchTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const text = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw Error("can not Update Todo");
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text);
  res.json({ message: "Updated the todo", createdTodo: TODOS[todoIndex] });
};
export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const text = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw Error("can not Update Todo");
  }
  TODOS.splice(+todoId,1);
  res.json({ message: "todo deleted", });
};
