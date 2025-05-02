# 📚 Bookkeeping Service API

A multilingual, role-based authenticated RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary** for storing book cover images. The system manages **Books**, **Users**, and **Libraries** with functionality for **borrowing**, **returning**, and **inventory management**.

---

## 🚀 Features

- JWT-based authentication
- Role-based access (author, borrower,admin,owner)
- Cloud image upload support (Cloudinary)
- Multilingual responses (English & Hindi)
- Library-level book inventory management
- Rich API relationships (Book → Author, Borrower, Library)

---

## 📦 Models

### 1. **User**
- Fields: `name`, `email`, `password`, `role` (`author` or `borrower`),`lang`
- Auth: Register, Login

### 2. **Book**
- Fields: `title`, `description`, `cost`, `photo`, `author`, `library`, `borrower`, `borrowedAt`

### 3. **Library**
- Fields: `name`, `description`,`website`,`email`,`phone`,`address` 

---

## 🔐 Authentication & Authorization

- Uses **JWT** tokens in headers (`Bearer <token>`)
- Only authenticated users can access protected routes
- Only users with appropriate roles can add/remove books from inventory

---

## 🌐 Multilingual Support

- Uses `i18n` middleware
- Supported languages: `en` (default) and `hi`
- Language inferred from JWT token or `Accept-Language` header

---

## ☁️ Image Uploads

- Book cover images are uploaded to **Cloudinary**
- Image URL is stored in the `photo` field of `Book`

---

## 📘 API Endpoints

### ✅ **Auth Routes**
| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| POST   | /api/users/register     | Register a user              |
| POST   | /api/users/login        | Login and get JWT            |

---

### 📚 **Books**
| Method | Endpoint               | Description                                |
|--------|------------------------|--------------------------------------------|
| GET    | /api/books             | List all books                             |
| GET    | /api/books/:id         | Get book details (incl. Author, Library)   |
| POST   | /api/books             | Create new book                            |
| PUT    | /api/books/:id         | Update book by ID                          |
| DELETE | /api/books/:id         | Delete book by ID                          |
| PUT | /api/books/:id/photo      | Upload photo of book by ID                 |
---

### 🧾 **Borrowing**
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| POST   | /api/borrow            | Borrow a book with charges    |
| PUT    | /api/return/:id        | Return a borrowed book        |

---

### 🏛️ **Libraries**
| Method | Endpoint                      | Description                                           |
|--------|-------------------------------|-------------------------------------------------------|
| GET    | /api/libraries                | List all libraries                                    |
| GET    | /api/libraries/:id            | Get library and its books (incl. Borrowers)          |
| POST   | /api/libraries                | Create new library                                    |
| PUT    | /api/libraries/:id            | Update library by ID                                  |
| DELETE | /api/libraries/:id            | Delete library by ID                                  |

---

### 🗂️ **Library Inventory**
| Method | Endpoint                                  | Description                             |
|--------|-------------------------------------------|-----------------------------------------|
| GET    | /api/libraries/:id/inventory              | List available books in library         |
| POST   | /api/libraries/:id/inventory              | Add book to library inventory           |
| DELETE | /api/libraries/:id/inventory/:bookId      | Remove book from library inventory      |

---

```
Usage
Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own.
```

## ⚙️ Environment Variables

Create a `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./public/uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📁 Folder Structure

```
bookkeepingService-api/
├── _data/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── config/
├── utils/
├── translation/
│   ├── en.json
│   └── hi.json
├── seeder.js
├── server.js
├── README.md
```

---

## 🛠️ Setup & Run

```bash
# Install dependencies
npm install

# Start the server
npm run dev
```

---

## Seeder file

```
delete data from database
node seeder -d

insert data into database
node seeder -i
```

## 📜 Example i18n Messages (en.json)

```json
{
  "file": {
    "file_missing": "Please upload a file",
    "file_invalid": "Please upload an image file",
    "file_size": "Please upload an image less than 1MB",
    "file_upload_problem": "Problem with the file upload"
  },
  "books": {
    "created": "Book successfully created"
  },
  "auth": {
    "unauthorized": "Not authorized to access this route"
  }
}
```

---

## 🌏 Hindi Translations (hi.json)

```json
{
  "file": {
    "file_missing": "कृपया एक फ़ाइल अपलोड करें",
    "file_invalid": "कृपया एक छवि फ़ाइल अपलोड करें",
    "file_size": "कृपया 1MB से कम आकार की छवि अपलोड करें",
    "file_upload_problem": "फ़ाइल अपलोड करने में समस्या"
  },
  "books": {
    "created": "किताब सफलतापूर्वक बनाई गई"
  },
  "auth": {
    "unauthorized": "इस मार्ग तक पहुँचने के लिए अधिकृत नहीं हैं"
  }
}
```

---

## 🧪 Testing

Use tools like **Postman** .
For file upload, use `multipart/form-data` with key `file`.

---

```
Version: 1.0.0
License : ISC
```