const jwt = require('jsonwebtoken'); // модуль проверки token
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  // верифицируем токен
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
