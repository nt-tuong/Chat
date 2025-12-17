# Database Configuration

Dự án này sử dụng **2 databases**:

## 1. PostgreSQL
**Mục đích**: Lưu trữ dữ liệu người dùng và các thông tin quan trọng khác
- User accounts
- User profiles
- Authentication data
- Other relational data

## 2. MongoDB
**Mục đích**: Lưu trữ dữ liệu conversations và messages
- Conversations (1-1, groups)
- Messages
- Real-time chat data

## Setup

### 1. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

### 2. Cấu hình PostgreSQL trong `.env`:
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=chat_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

Hoặc sử dụng connection string:
```env
POSTGRES_URI=postgresql://postgres:postgres@localhost:5432/chat_db
```

### 3. Cấu hình MongoDB trong `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/chat
```

### 4. Cài đặt dependencies:
```bash
npm install
```

### 5. Tạo database PostgreSQL:
```sql
CREATE DATABASE chat_db;
```

### 6. Chạy server:
```bash
npm run dev
```

## Cấu trúc Database

### PostgreSQL Tables (cần tạo):
- `users` - Thông tin người dùng
- `user_profiles` - Profile chi tiết
- `sessions` - User sessions
- `tokens` - Authentication tokens

### MongoDB Collections:
- `conversations` - Danh sách conversations
- `messages` - Messages trong conversations
- `groups` - Thông tin groups

## Usage trong Code

### PostgreSQL:
```javascript
const { pool, query } = require('./config/postgres');

// Sử dụng pool.query
const result = await query('SELECT * FROM users WHERE id = $1', [userId]);

// Hoặc sử dụng pool trực tiếp
const client = await pool.connect();
try {
  const result = await client.query('SELECT * FROM users');
} finally {
  client.release();
}
```

### MongoDB:
```javascript
const mongoose = require('mongoose');
const Conversation = require('./models/Conversation'); // MongoDB model

const conversation = await Conversation.findOne({ _id: convId });
```

