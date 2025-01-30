"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentById = exports.getStudents = void 0;
const dataSource_1 = require("../database/dataSource");
const Student_1 = require("../models/Student");
// Get the student repository from the data source
const studentRepository = dataSource_1.AppDataSource.getRepository(Student_1.Student);
// Get all students
const getStudents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentRepository.find();
        res.json(students); // Respond with the list of students
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Error fetching students" });
    }
});
exports.getStudents = getStudents;
// Get student by ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield studentRepository.findOneBy({ id: parseInt(id) });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Error fetching student" });
    }
});
exports.getStudentById = getStudentById;
// Add a new student
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield studentRepository.save(newStudent);
        res.status(201).json(newStudent);
    }
    catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ error: "Error adding student" });
    }
});
exports.addStudent = addStudent;
// Update student by ID
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, age, major, gpa, dateOfBirth, state, universityName } = req.body;
        const studentToUpdate = yield studentRepository.findOneBy({ id: parseInt(id) });
        if (!studentToUpdate) {
            return res.status(404).json({ error: "Student not found" });
        }
        studentToUpdate.firstName = firstName !== null && firstName !== void 0 ? firstName : studentToUpdate.firstName;
        studentToUpdate.lastName = lastName !== null && lastName !== void 0 ? lastName : studentToUpdate.lastName;
        studentToUpdate.age = age !== null && age !== void 0 ? age : studentToUpdate.age;
        studentToUpdate.major = major !== null && major !== void 0 ? major : studentToUpdate.major;
        studentToUpdate.gpa = gpa !== null && gpa !== void 0 ? gpa : studentToUpdate.gpa;
        studentToUpdate.dateOfBirth = dateOfBirth !== null && dateOfBirth !== void 0 ? dateOfBirth : studentToUpdate.dateOfBirth;
        studentToUpdate.state = state !== null && state !== void 0 ? state : studentToUpdate.state;
        studentToUpdate.universityName = universityName !== null && universityName !== void 0 ? universityName : studentToUpdate.universityName;
        yield studentRepository.save(studentToUpdate);
        res.status(200).json(studentToUpdate);
    }
    catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Error updating student" });
    }
});
exports.updateStudent = updateStudent;
// Delete a student by ID
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteResult = yield studentRepository.delete(id);
        if (deleteResult.affected === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Error deleting student" });
    }
});
exports.deleteStudent = deleteStudent;
