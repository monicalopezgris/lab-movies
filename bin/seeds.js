const mongoose = require('mongoose');

const movie = require('../models/movie');

const data = [
  {
    title: 'title1',
    genre: 'Comedy',
    plot: 'Plot1',
  },
  {
    title: 'title2',
    genre: 'Comedy',
    plot: 'Plot 2',
  },
  {
    title: 'title3',
    genre: 'Drama',
    plot: 'Plot 3',
  },
];

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true })
movie.create(data)
  .then(() => {
    console.log('done');
  });
