const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todo-controllers');
const auth = require('../middlewares/authentication/auth');

router.get('/', auth, todoController.getAllUserTodos);
// router.post('/', userValidation(), userController.createUser);
// router.post('/auth', userValidation(), userController.loginUser);
module.exports = router;
