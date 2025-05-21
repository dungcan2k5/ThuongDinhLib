# Thư viện Thượng Đình

## Giới thiệu
Hệ thống quản lý thư viện trực tuyến với các tính năng mượn sách, quản lý người dùng và quản lý kho sách.

## Công nghệ sử dụng
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js >= 14
- MongoDB >= 4.4

### Cài đặt
1. Clone repository:
```bash
git clone https://github.com/your-username/ThuongDinhLib.git
cd ThuongDinhLib
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env trong thư mục backend:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/thuongdinhlib
JWT_SECRET=your_jwt_secret
```

### Chạy ứng dụng
1. Chạy đồng thời cả backend và frontend trong môi trường phát triển
``` bash
npm run dev
```
2. Cũng có thể chạy riêng biệt
``` bash
# Start backend only
npm run server
# Start frontend only
npm run client
```
## Tính năng chính
- Đăng nhập/Đăng ký tài khoản
- Tìm kiếm và mượn sách
- Quản lý thông tin cá nhân
- Quản lý sách (Admin)
- Quản lý người dùng (Admin)
- Quản lý danh mục (Admin)