const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../moduls/user');
// const AuthError = require('../utils/errors/authError');
const BadRequest = require('../utils/errors/badRequest');
const ConflictError = require('../utils/errors/conflictError');
const NotFound = require('../utils/errors/notFound');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then(() => res.send(
        {
          data: {
            name, email,
          },
        },
      ))
      // eslint-disable-next-line consistent-return
      .catch((err) => {
        if (err.code === 11000) {
          return next(new ConflictError('Пользователь с данным email уже существует'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequest('Некорректные данные'));
        }
        next(err);
      });
  })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};
