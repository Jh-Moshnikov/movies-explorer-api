const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const wrongRoutes = require('./wrong');
const { validationLogin, validationCreateUser } = require('../middlewares/getValidation');
const { createUser, login } = require('../controllers/user');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);
router.use(userRoutes);
router.use(movieRoutes);
router.use(wrongRoutes);

module.exports = router;
