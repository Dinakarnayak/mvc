

# Student Management System

A full-stack web application to manage student records, built using **TypeScript**, **Express**, **TypeORM**, and following the **MVC** (Model-View-Controller) architecture. The system supports CRUD (Create, Read, Update, Delete) operations on student data.

---

## Features

- **Create Student**: Allows the addition of a new student with details like first name, last name, age, major, GPA, date of birth, state, and university name.
- **Read Students**: Fetch all students or retrieve a student by their ID.
- **Update Student**: Modify an existing student's details.
- **Delete Student**: Delete a student record from the system.

---

## Tech Stack

- **Backend**:
  - **Node.js**
  - **TypeScript**
  - **Express.js**
  - **TypeORM** (for database ORM)
  - **SQLite** (or any other SQL-based database)
  
- **Database**:
  - SQLite (for development)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm (Node Package Manager)
- SQLite (or another database)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Dinakarnayak/student-management-system.git
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd student-management-system
npm install
```

### Step 3: Configure Database

Ensure that your database configuration is correct (using `ormconfig.json` for TypeORM settings). You may need to adjust this for the type of database you are using (SQLite, MySQL, etc.).

### Step 4: Run the Application

Start the application using:

```bash
npm run dev
```

The application will run on `http://localhost:3000`.

### Step 5: Test the Endpoints

You can test the following endpoints using tools like **Postman** or **cURL**:

- `GET /students`: Fetch all students.
- `GET /students/:id`: Fetch a student by ID.
- `POST /students`: Add a new student.
- `PUT /students/:id`: Update an existing student's details.
- `DELETE /students/:id`: Delete a student by ID.

---

## MVC Folder Structure

The project follows the **Model-View-Controller** design pattern, with the following folder structure:

```
/src
  /controllers             # Handles HTTP requests, defines route logic
    studentController.ts   # Defines logic for student CRUD operations
  /models                  # Contains database models and schema definitions
    Student.ts             # Defines the Student entity schema for TypeORM
  /routes                  # Defines API route mappings
    studentRoutes.ts       # Maps routes to controller actions
  /services                # Business logic (optional, can be used to keep controllers lean)
  /database                # Database connection and initialization (TypeORM)
    dataSource.ts          # Sets up the TypeORM connection and synchronizes the DB
  /middleware              # Custom middleware (optional)
  server.ts                # Application entry point
```

---

## Application Flow

1. **Model (M)**: The `Student.ts` model represents the data structure in the database and is used by TypeORM to interact with the database.
2. **View (V)**: In this backend system, the "view" would primarily be the JSON response returned by the API.
3. **Controller (C)**: The `studentController.ts` file contains all the logic for handling incoming HTTP requests. Each method is responsible for interacting with the model, performing the necessary actions, and returning the response.

---

## Sample Code

### Controller Example (studentController.ts)

```typescript
import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { Student } from "../models/Student";

// Get the student repository from the data source
const studentRepository = AppDataSource.getRepository(Student);

// Get all students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await studentRepository.find();
    res.status(200).json(students); // Respond with the list of students
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students", details: error.message });
  }
};

// Add a new student
export const addStudent = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age, major, gpa, dateOfBirth, state, universityName } = req.body;

    const newStudent = studentRepository.create({
      firstName,
      lastName,
      age,
      major,
      gpa,
      dateOfBirth,
      state,
      universityName,
      dateEnrolled: new Date(),
    });

    await studentRepository.save(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Error adding student", details: error.message });
  }
};
```

### Model Example (Student.ts)

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  major: string;

  @Column()
  gpa: number;

  @Column()
  dateOfBirth: string;

  @Column()
  state: string;

  @Column()
  universityName: string;

  @Column()
  dateEnrolled: Date;
}
```

### Database Configuration (dataSource.ts)

```typescript
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../models/Student";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "students.db",  // Specify your database type and connection settings
  synchronize: true,
  logging: true,
  entities: [Student],
  subscribers: [],
  migrations: [],
});
```

---

## Development

### Running the Application Locally

1. Clone the repository.
2. Install the dependencies (`npm install`).
3. Configure your database connection (use `ormconfig.json` or configure directly in `dataSource.ts`).
4. Run the app (`npm run dev`).

---



### Contributions

Contributions are welcome! If you want to contribute, fork the repository, create a branch, and open a pull request.

---

### Contact

For any questions, feel free to reach out:

- Email: [dinakarnayak4248@gmail.com](mailto:dinakarnayak4248@gmail.com)
- GitHub: [@Dinakarnayak](https://github.com/Dinakarnayak)

---

This template follows the **MVC** architecture, where:

- **Models** represent the database schema.
- **Views** (API responses) display the data.
- **Controllers** handle the logic for CRUD operations.

