const express = require('express');

const router = express.Router();

const userController = require('../controllers/user-controllers');
const userValidation = require('../middlewares/validations/user-validation');
const auth = require('../middlewares/authentication/auth');

router.get('/', userController.getAllUsers);
router.post('/', userValidation(), userController.createUser);
router.post('/auth', userValidation(), userController.loginUser);
router.get('/profile', auth, userController.getUser);
module.exports = router;
