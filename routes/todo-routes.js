const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todo-controllers');
const auth = require('../middlewares/authentication/auth');

router.get('/', auth, todoController.getAllUserTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.editSingleTodo);
router.get('/:id', auth, todoController.getSingleUserTodo);
router.delete('/:id', auth, todoController.deleteSingleTodo)
module.exports = router;
