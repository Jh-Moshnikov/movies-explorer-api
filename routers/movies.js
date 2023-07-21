const cardRoutes = require('express').Router();

const { validationCreateMovie, validationMoviesId } = require('../middlewares/getValidation');

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movie');

cardRoutes.get('/movies', getMovies);
cardRoutes.post('/movies', validationCreateMovie, createMovie);
cardRoutes.delete('/movies/_id', validationMoviesId, deleteMovie);

module.exports = cardRoutes;
