// const moment = require('moment');
const { Todo } = require('../database/models');
const { ErrorHandler } = require('../utils/error');
const { responseHandler } = require('../utils/response');

// create todo
const createTodo = async (req, res, next) => {
  const { id: userId } = req.user;
  const { title, description, todoAt } = req.body;

  if (!title) {
    return next(new ErrorHandler(400, 'Title is required'));
  }

  if (!todoAt) {
    return next(new ErrorHandler(400, 'A valid todoAt date is required'));
  }
  try {
    const todo = await Todo.create({
      title,
      description,
      userId,
      todoAt: new Date(todoAt)
    });
    return responseHandler(res, 201, 'Todo created', { todo: todo.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// get all todos
const getAllUserTodos = async (req, res, next) => {
  const { id: userId } = req.user;
  console.log("userId", userId)
  try {
    const todos = await Todo.findAll({ where: { userId },
      order: [ ['createdAt', 'DESC']] });
    return responseHandler(res, 200, 'Users todos', { todos });
  } catch (err) {
    return next(err);
  }
};

// get a single todo

const getSingleUserTodo = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: todoId } = req.params;
  try {
    const todo = await Todo.findOne({ where: { userId, id: todoId } });
    if (!todo) {
      throw new ErrorHandler(404, 'Todo not found');
    }
    return responseHandler(res, 200, 'Single User todo', { todo });
  } catch (err) {
    return next(err);
  }
};

// edit a single todo
const editSingleTodo = async (req, res, next) => {
  const { id: todoId } = req.params;
  const { id: userId } = req.user;
  const requestBody = req.body;
  const update = {};
  Object.entries(requestBody).forEach((param) => {
    // eslint-disable-next-line prefer-destructuring
    update[param[0]] = param[1];
  });

  try {
    const result = Todo.update(update, { where: { userId, id: todoId } });
    if (!result) {
      throw new ErrorHandler(404, 'Todo not found');
    }
    return responseHandler(res, 200, 'Todo updated');
  } catch (err) {
    return next(err);
  }
};

const deleteSingleTodo = async (req, res, next) => {
  const { id: todoId } = req.params;
  const { id: userId } = req.user;
  try {
    await Todo.destroy({
      where: {
        id: todoId,
        userId
      }
    });
    return responseHandler(res, 200, 'Todo deleted');
  }
  catch(err){
    return next(err);
  }
}

module.exports = {
  getAllUserTodos, createTodo, getSingleUserTodo, editSingleTodo,deleteSingleTodo 
};
