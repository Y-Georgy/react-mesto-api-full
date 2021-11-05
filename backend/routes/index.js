const router = require('express').Router();
const userRouter = require('./users.js');
const cardRouter = require('./cards.js');
const NotFoundError = require('../errors/not-found-err');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Ошибка - некорректный запрос'));
});

module.exports = router;
