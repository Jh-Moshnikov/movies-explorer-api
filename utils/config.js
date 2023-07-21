require('dotenv').config();

const { NODE_ENV, DB } = process.env;

const DB_CFG = NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  DB_CFG,
};
