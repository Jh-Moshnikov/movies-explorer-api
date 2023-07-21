const wrongRoutes = require('express').Router();
const NotFound = require('../utils/errors/notFound');

wrongRoutes.use((req, res, next) => next(new NotFound('Такая страница не существует')));

module.exports = wrongRoutes;
