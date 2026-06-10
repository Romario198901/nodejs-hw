# Notes API

A Node.js/Express REST API for managing notes with user authentication, JWT tokens, and cloud storage integration.

## Features

- **User Authentication**
  - User registration and login
  - JWT-based session management
  - Password reset via email
  - Refresh token support

- **Notes Management**
  - Create, read, update, and delete notes
  - Retrieve all notes for authenticated users
  - Get individual notes by ID

- **User Profile**
  - Update user avatar with cloud storage (Cloudinary)

- **Security**
  - Password hashing with bcrypt
  - Input validation with celebrate
  - CORS support
  - Helmet for HTTP security headers
  - Cookie-based session management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Validation**: Celebrate
- **Security**: Bcrypt, Helmet, CORS
- **Logging**: Pino

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account (for avatar uploads)
- Email service credentials (for password reset emails)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Romario198901/nodejs-hw.git
   cd nodejs-hw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URL=mongodb://your_mongodb_url
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_email_password
   RESET_PASSWORD_URL=http://localhost:3000
   ```

4. **Run the server**

   **Development** (with auto-reload):
   ```bash
   npm run dev
   ```

   **Production**:
   ```bash
   npm start
   ```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login with credentials |
| POST | `/auth/logout` | Logout current user |
| POST | `/auth/refresh` | Refresh authentication session |
| POST | `/auth/request-reset-email` | Request password reset email |
| POST | `/auth/reset-password` | Reset password with token |

### Notes Routes (`/notes`) *Authentication Required*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes for authenticated user |
| GET | `/notes/:noteId` | Get a specific note by ID |
| POST | `/notes` | Create a new note |
| PATCH | `/notes/:noteId` | Update a note |
| DELETE | `/notes/:noteId` | Delete a note |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/users/me/avatar` | Update user avatar (Authentication Required) |

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

Alternatively, the token is also stored in an HTTP-only cookie for session management.

## Project Structure

```
src/
├── server.js                 # Express app entry point
├── constants/               # Constants and enums
│   ├── tags.js
│   └── time.js
├── controllers/             # Request handlers
│   ├── authController.js
│   ├── notesController.js
│   └── userController.js
├── db/                      # Database configuration
│   └── connectMongoDB.js
├── middleware/              # Express middleware
│   ├── authenticate.js      # JWT verification
│   ├── errorHandler.js      # Global error handler
│   ├── logger.js            # Request logging (Pino)
│   ├── multer.js            # File upload handling
│   └── notFoundHandler.js   # 404 handler
├── models/                  # Mongoose schemas
│   ├── note.js
│   ├── session.js
│   └── user.js
├── routes/                  # API route definitions
│   ├── authRoutes.js
│   ├── notesRoutes.js
│   └── userRoutes.js
├── services/                # Business logic
│   └── auth.js
├── templates/               # Email templates
│   └── reset-password-email.html
├── utils/                   # Helper functions
│   ├── saveFileToCloudinary.js
│   └── sendMail.js
└── validations/             # Input validation schemas
    ├── authValidation.js
    └── notesValidation.js
```

## Available Scripts

- `npm start` - Run the server in production mode
- `npm run dev` - Run the server in development mode with auto-reload (nodemon)

## Error Handling

The API uses centralized error handling middleware. All errors are returned in the following format:

```json
{
  "message": "Error message",
  "statusCode": 400
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error

## Middleware

- **Logger (Pino)**: Logs all HTTP requests
- **Authentication**: Verifies JWT tokens for protected routes
- **Validation (Celebrate)**: Validates request data against schemas
- **Error Handler**: Handles and formats errors
- **CORS**: Enables cross-origin requests
- **Helmet**: Sets security HTTP headers
- **Cookie Parser**: Parses cookies from requests

## Development

### Prerequisites for development

- Install [nodemon](https://nodemon.io/) globally or as a dev dependency for auto-reloading
- ESLint is configured for code quality

### ESLint

Run ESLint to check code quality:
```bash
npx eslint src/
```

## License

ISC

## Author

Roman Hrydin (romario198901@gmail.com)

## Repository

[https://github.com/Romario198901/nodejs-hw](https://github.com/Romario198901/nodejs-hw)
