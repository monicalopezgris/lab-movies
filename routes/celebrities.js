const express = require('express');
const celebrities = require('../models/celebrity');

const router = express.Router();

/* GET celebrity */

router.get('/', (req, res, next) => {
  celebrities.find()
    .then((celeb) => {
      res.render('celebrities/index', { celeb });
    })
    .catch((err) => {
      next('The error while searching celebrities occurred: ', err);
    });
});

/* CREATE NEW celebrity */

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/new', (req, res, next) => {
  const { name, ocupation, catchPhrase } = req.body;
  celebrities.create({
    name,
    ocupation,
    catchPhrase,
  })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

/* GET celebrity by ID */

router.get('/:id', (req, res, next) => {
  const id = req.params;
  celebrities.findById(id.id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

/* DELETE CELEB */

router.post('/:id/delete', (req, res, next) => {
  const id = req.params;
  celebrities.findByIdAndDelete(id.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

/* UPDATE celebrity */

router.get('/:id/edit', (req, res, next) => {
  const id = req.params;
  celebrities.findById(id.id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  console.log('aa');
  const id = req.params;
  const { name, ocupation, catchPhrase } = req.body;
  celebrities.findByIdAndUpdate(id.id, { name, ocupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
