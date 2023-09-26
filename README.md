# Todo App with Express and MongoDB

## Description
This repository contains a simple Todo web application built using the Express.js framework and MongoDB as the database. The app includes user authentication to ensure that users can securely manage their tasks. This README file provides information on how to set up and use the application.

## Features
- User authentication and authorization.
- Create, read, update, and delete tasks.
- User-specific task management.
- Responsive web design for mobile and desktop.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Authentication](#authentication)
4. [Database](#database)
5. [Folder Structure](#folder-structure)

## Installation
Follow these steps to set up and run the Todo app on your local machine:

1. Clone this repository:
   ```
   git clone https://github.com/your-username/todo-express-mongodb.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-express-mongodb
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

## Usage
To run the Todo app locally, use the following command:

```
npm start
```

The application will be accessible in your web browser at `http://localhost:3000`.

## Authentication
The application includes user authentication. Users can register for an account or log in with existing credentials. Once authenticated, they can create and manage their tasks.

## Database
The app uses MongoDB Atlas as its database. You can change with your own database going to file `models/databaseConfig.js`

## Folder Structure
The project follows a typical Express.js application structure:

- `app.js`: The main entry point of the application.
- `routes/`: Contains route handlers for different parts of the app.
- `models/`: Defines the database models using Mongoose.
- `views/`: Contains the HTML templates for rendering pages.
- `public/`: Stores static assets (CSS, JavaScript, images, etc.).
- `config.js`: Configuration file for environment-specific settings.

## Contributing
Contributions to this project are welcome. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes with clear commit messages.
5. Push your branch to your forked repository.
6. Create a pull request to merge your changes into the main repository.

---

Enjoy using the Todo app! If you have any questions or encounter any issues, please feel free to [open an issue](https://github.com/your-username/todo-express-mongodb/issues) on GitHub.

