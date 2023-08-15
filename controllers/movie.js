const Movie = require('../moduls/movie');
const BadRequest = require('../utils/errors/badRequest');
const NotFound = require('../utils/errors/notFound');
const Forbidden = require('../utils/errors/forbidden');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  // const { movieId } = req.params;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Такого фильма не существует'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new Forbidden('Вы не можете удалять чужие фильмы'));
      }
      return Movie.findByIdAndDelete(req.params._id)
        .then(() => res.send({ message: 'Фильм успешно удален' }));
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};
