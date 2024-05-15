# JWT Server Example

## Overview

This repository provides an example implementation of a JSON Web Token (JWT) based authentication server. The server is built using Node.js and Express and demonstrates how to create, sign, and verify JWT tokens to secure API endpoints.

## Features

- **User Registration:** Allows users to register with a username and password.
- **User Login:** Authenticates users and provides a JWT token upon successful login.
- **Protected Routes:** Demonstrates how to protect API routes using JWT tokens.
- **Token Verification:** Middleware to verify JWT tokens and protect routes from unauthorized access.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/jwt-server-example.git
   cd jwt-server-example
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Configuration

1. **Environment Variables:**

   Create a `.env` file in the root of the project and add the following environment variables:

   ```plaintext
   PORT=4000
   JWT_SECRET=secret
   MONGODB_URI=mongodb://127.0.0.1:27017/jwt-example
   ```

   - `PORT`: The port number on which the server will run.
   - `JWT_SECRET`: A secret key for signing JWT tokens. Ensure this key is kept secure.
   - `MONGODB_URI`: The MongoDB connection URI.

### Running the Server

To start the server, run:

```bash
npm start
```

or

```bash
yarn start
```

The server will be running at `http://localhost:4000`.

## API Endpoints

### 1. User Registration

- **Endpoint:** `POST /register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "your_username",
    "password": "your_password",
    "email": "your_email"
  }
  ```
- **Response:**

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "name": "your_username",
      "email": "your_email"
    }
  }
  ```

- **Header Response:**
  ```json
  {
    "Authorization : Bearer jwt_token"
    }
  ```

### 2. User Login

- **Endpoint:** `POST /login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User logged in successfully",
    "user": {
      "id": "user_id",
      "email": "your_email",
      "name": "your_username"
    }
  }
  ```
- **Header Response:**
  ```json
  {
    "Authorization : Bearer jwt_token"
    }
  ```

### 3. Protected Route

- **Endpoint:** `GET /protectedRoute`
- **Description:** A protected route that requires a valid JWT token.
- **Request Header:**
  ```plaintext
  Authorization: Bearer your_jwt_token
  ```
- **Response:**
  ```json
  {
    "message": "This is a protected route"
  }
  ```
- **Header Response:**
  ```json
  {
    "Authorization : Bearer jwt_token"
    }
  ```

## Project Structure

```
jwt-server-example/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── auth.ts
│   ├── middleware/
│   │   ├── cookieJwtAuth.ts
│   ├── models/
│   │   ├── user.ts
│   ├── routes/
│   │   ├── auth.ts
│   ├── index.ts
├── .env
├── .gitignore
├── package.json
├── README.md
```

## Important Files

- **index.ss:** Initializes the Express application and sets up middleware.
- **auth.ts:** Contains logic for user registration and login.
- **cookieJwtAuth.ts:** Middleware to protect routes by verifying JWT tokens.
- **user.ts:** User model for storing user data.
- **auth.ts:** Defines authentication-related routes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Acknowledgements

- [Express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)

---

Happy coding! If you have any questions, feel free to open an issue or contact the repository owner.
