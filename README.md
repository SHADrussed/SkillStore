# Marketplace Project

## Описание

Frontend часть интернет-магазина с базовым функционалом:

- регистрация и авторизация пользователей (JWT)
- просмотр списка товаров
- добавление товаров в корзину
- управление корзиной (изменение количества, удаление)
- админ-панель для создания и удаления товаров

Проект работает с REST API, предоставленным backend-частью (Django).

---

## Технологии

- React
- React Router
- JavaScript (ES6+)
- Fetch API
- CSS Modules
- JWT Authentication

---

## Запуск проекта

### Установка зависимостей

```bash
npm install

Запуск frontend
npm run dev


## Backend API

Base URL:

http://localhost:8000


 Авторизация (JWT)

После логина сервер возвращает токен:

{
  "access": "token",
  "refresh": "token"
}

Для защищённых запросов используется:

Authorization: Bearer <access_token>
## Auth endpoints
POST /users/register/ — регистрация
POST /users/login/ — вход
POST /users/token/refresh/ — обновление токена
GET /users/me/ — данные пользователя
## Products endpoints
GET /products/ — список товаров
GET /products/<id>/ — товар по ID
POST /products/product/ — создание товара (admin)
PUT /products/product/<id>/ — обновление товара (admin)
DELETE /products/product/<id>/ — удаление товара (admin)
## Cart endpoints
GET /cart/ — получить корзину
POST /cart/add/ — добавить товар
DELETE /cart/remove/<product_id>/ — удалить товар
## Основной функционал
Пользователь:
регистрация / вход
- просмотр товаров
- добавление в корзину
- удаление из корзины
Администратор:
доступен по /admin
- создание товаров
- удаление товаров


👨‍💻 Автор

Студенческий учебный проект
```
