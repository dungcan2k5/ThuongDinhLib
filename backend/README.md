# ThuongDinhLib Backend API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication
Hầu hết các endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Books API

#### Lấy danh sách sách
```
GET /books
```
- Public access
- Response: Array of book objects

#### Tìm kiếm sách
```
GET /books/search/book?q=<search_term>
```
- Public access
- Query params:
  - q: Từ khóa tìm kiếm (title hoặc author)
- Response: Array of matching books

#### Tìm theo danh mục
```
GET /books/search/category?category=<category_name>
```
- Public access
- Query params:
  - category: Tên danh mục
- Response: Array of books in category

### Customer API

#### Đăng ký
```
POST /customers/register
```
- Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "address": "string"
}
```

#### Đăng nhập
```
POST /customers/login
```
- Body:
```json
{
  "email": "string",
  "password": "string"
}
```
- Response: JWT token

#### Cập nhật thông tin cá nhân
```
PUT /customers/profile
```
- Requires: Auth token
- Body:
```json
{
  "name": "string",
  "phone": "string",
  "address": "string"
}
```

#### Đổi mật khẩu
```
PUT /customers/profile
```
- Requires: Auth token
- Body:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

### Admin API

#### Đăng nhập Admin
```
POST /staffs/login
```
- Body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Quản lý sách

##### Thêm sách mới
```
POST /books
```
- Requires: Admin token
- Body:
```json
{
  "title": "string",
  "isbn": "string",
  "author": "string",
  "category": "string",
  "publishYear": "number",
  "price": "number",
  "quantity": "number",
  "description": "string",
  "image": "string"
}
```

##### Cập nhật sách
```
PUT /books/:id
```
- Requires: Admin token
- Params: book ID
- Body: Tương tự thêm sách

##### Xóa sách
```
DELETE /books/:id
```
- Requires: Admin token
- Params: book ID

### Upload API

#### Upload ảnh
```
POST /upload
```
- Requires: Admin token
- Content-Type: multipart/form-data
- Body:
  - file: Image file (max 5MB)
- Response: URL của ảnh đã upload

## Mã lỗi

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Models

### Book
```javascript
{
  title: String,
  isbn: String,
  author: String,
  category: String,
  publishYear: Number,
  price: Decimal128,
  quantity: Number,
  description: String,
  image: String
}
```

### Customer
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  membershipDate: Date
}
```

### Staff
```javascript
{
  name: String,
  email: String,
  phone: String,
  role: String,
  isAdmin: Boolean,
  salary: Decimal128,
  password: String
}
```
