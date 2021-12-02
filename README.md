# Проект: React-mesto-api-full

### Описание
Объединение фронтенда и бекенда, подготовка к публикации  
Репозиторий разработки фронтенда - https://github.com/Y-Georgy/react-mesto-auth  
Репозиторий разработки бекенда - https://github.com/Y-Georgy/express-mesto  

### Функционал
Авторизация и регистрации пользователей, операции с карточками и пользователями  
Опубликованный фронтенд: https://mesto.tmweb.ru/  
Опубликованный бекенд: https://api.mesto.tmweb.ru/

### Стек

```
- React.js
- Node.js
- Express
- Rest API
- MongoDB
- Mongoose
- Eslint
- CSS3
```

### Развёртывание  
```
git clone https://github.com/Y-Georgy/react-mesto-api-full.git
```
Фронтенд:
```
cd frontend/
npm i && npm start
```
Для подключения фронтенда к локальному бекенду нужно поменять linkBackend, см. первые две строчки в файле:
```
frontend\src\utils\constants.js
```

Бекенд:

```
cd backend/
npm i && npm run dev
```

Установка MongoDB:

- Windows https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition  
- MacOS https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/


### Планы по доработке 

- Сделать нативную валидацию форм
- Подтверждение Email при регистрации

![N|Solid](https://img.shields.io/badge/-©%202021-red)
