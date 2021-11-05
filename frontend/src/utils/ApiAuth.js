import { linkBackend } from './constants'

class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
    }
  }

  register(dataAuth) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject(`Пользователь с таким Email уже зарегистрирован!`)
      } else {
        return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.') // TODO не приходит message ошибки с сервера
      }
    })
  }

  login(dataAuth) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return Promise.reject(`Пользователь с таким Email не найден или пароль введён не верно!`)
      } else {
        return Promise.reject('Что-то пошло не так! Попробуйте ещё раз.')
      }
    })
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return Promise.reject(`Токен не валиден`)
      } else {
        return Promise.reject(`Что-то пошло не так! Попробуйте ещё раз. Ошибка ${res.status}`)
      }
    })
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: linkBackend,
})
