const express = require('express');
const movies = require('../models/movie');

const router = express.Router();

/* GET movie */

router.get('/', (req, res, next) => {
  movies.find()
    .then((film) => {
      res.render('movies/index', { film });
    })
    .catch((err) => {
      next('The error while searching movies occurred: ', err);
    });
});

/* CREATE NEW movie */

router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

router.post('/new', (req, res, next) => {
  const { title, genre, plot } = req.body;
  movies.create({
    title,
    genre,
    plot,
  })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

/* GET movie by ID */

router.get('/:id', (req, res, next) => {
  const id = req.params;
  movies.findById(id.id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

/* DELETE movie */

router.post('/:id/delete', (req, res, next) => {
  const id = req.params;
  movies.findByIdAndDelete(id.id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

/* UPDATE movie */

router.get('/:id/edit', (req, res, next) => {
  const id = req.params;
  movies.findById(id.id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  console.log('aa');
  const id = req.params;
  const { title, genre, plot } = req.body;
  movies.findByIdAndUpdate(id.id, { title, genre, plot })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
