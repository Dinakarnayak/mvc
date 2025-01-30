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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching students:", error.message);
      res.status(500).json({ error: "Error fetching students", details: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await studentRepository.findOneBy({ id: parseInt(id) });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching student:", error.message);
      res.status(500).json({ error: "Error fetching student", details: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Add a new student
export const addStudent = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age, major, gpa, dateOfBirth, state, universityName } = req.body;

    if (!firstName || !lastName || !major || !gpa || !dateOfBirth || !state || !universityName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding student:", error.message);
      res.status(500).json({ error: "Error adding student", details: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Update student by ID
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, major, gpa, dateOfBirth, state, universityName } = req.body;

    const studentToUpdate = await studentRepository.findOneBy({ id: parseInt(id) });

    if (!studentToUpdate) {
      return res.status(404).json({ error: "Student not found" });
    }

    studentToUpdate.firstName = firstName ?? studentToUpdate.firstName;
    studentToUpdate.lastName = lastName ?? studentToUpdate.lastName;
    studentToUpdate.age = age ?? studentToUpdate.age;
    studentToUpdate.major = major ?? studentToUpdate.major;
    studentToUpdate.gpa = gpa ?? studentToUpdate.gpa;
    studentToUpdate.dateOfBirth = dateOfBirth ?? studentToUpdate.dateOfBirth;
    studentToUpdate.state = state ?? studentToUpdate.state;
    studentToUpdate.universityName = universityName ?? studentToUpdate.universityName;

    await studentRepository.save(studentToUpdate);

    res.status(200).json(studentToUpdate);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating student:", error.message);
      res.status(500).json({ error: "Error updating student", details: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteResult = await studentRepository.delete(id);

    if (deleteResult.affected === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting student:", error.message);
      res.status(500).json({ error: "Error deleting student", details: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
