require('dotenv').config();
const jwt = require('jsonwebtoken'); // модуль проверки token
const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  // верифицируем токен
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'); // TODO проверить работает ли .ENV
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
