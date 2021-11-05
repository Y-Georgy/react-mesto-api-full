const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate'); // валидация приходящих данных
const { isValidUrl } = require('../utils/methods');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users'); // импортируем контроллеры

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  // валидируем body
  body: Joi.object().keys({
    avatar: Joi.string().custom(isValidUrl),
  }),
}), updateAvatar);

module.exports = router; // экспортировали роутер
