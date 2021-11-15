require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate'); // валидация приходящих данных
const { errors } = require('celebrate'); // для обработки ошибок joi, celebrate
const cors = require('cors'); // пакет node.js
const router = require('./routes');

const auth = require('./middlewares/auth');
const centralizedErrors = require('./middlewares/centralizedErrors');
const { isValidUrl } = require('./utils/methods');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const { PORT = 3002, NODE_ENV } = process.env;

const app = express();
console.log(process.env.PORT);
console.log(PORT);
console.log(NODE_ENV);

// для подключения к БД
// mongoose.connect(
//   NODE_ENV === 'production'
//     ? `mongodb://${LOGIN_DB}:${PASSW_DB}@127.0.0.1:27017/mestodb`
//     : 'mongodb://localhost:27017/mestodb',
// );

mongoose.connect('mongodb://188.225.83.129:27017/mestodb');

// Безопасность. Обработка CORS запросов
const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto-georgy.nomoredomains.work',
    'https://mesto-georgy.nomoredomains.work',
    'http://mesto.tmweb.ru',
    'https://mesto.tmweb.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options)); // ПЕРВЫМ!

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.post(
  '/signup',
  celebrate({
    // валидируем body
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(isValidUrl),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    // валидируем body
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
    }),
  }),
  login,
);
app.get('/logout', (req, res, next) => {
  res
    .cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .send({ message: 'Выход совершен успешно' });
  next();
});

// авторизация
app.use(auth);

app.use(router); // запускаем роутер

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(centralizedErrors); // централизованная обработка ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
