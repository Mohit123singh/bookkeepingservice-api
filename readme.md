# Book-Keeping-Service API
 
> Backend API for book keeping service application.

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own.

## Install Dependencies
```
npm install
```
## Seeder file
```
delete data from database
node seeder -d

insert data into database
node seeder -i
```

## Run app
```
# Run in dev mode
npm run dev

# Run in prod mode
npm start

```
## Features
```
- JWT-based authentication
- Role-based access (Author, Borrower)
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
 PUT | /api/books/:id/photo         |Upload Photo of a specific book by ID                          |

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

- Version: 1.0.0
- License : ISC