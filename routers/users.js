const userRoutes = require('express').Router();

const {
  getUserInfo,
  updateUser,
} = require('../controllers/user');

const { validationUserInfo } = require('../middlewares/getValidation');

userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', validationUserInfo, updateUser);
module.exports = userRoutes;
