import express from "express";
import { getStudents, addStudent, deleteStudent, getStudentById, updateStudent } from "../controllers/studentController";

const router = express.Router();

// Route to get all students
router.get("/students", getStudents);

// Route to add a new student
router.post("/students", addStudent);

// Route to delete a student by ID
router.delete("/students/:id", deleteStudent);

// Route to get a student by ID
router.get("/students/:id", getStudentById);

// Route to update a student's information
router.patch("/students/:id", updateStudent);

export default router;
