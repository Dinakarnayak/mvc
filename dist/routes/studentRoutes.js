"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
router.get("/students", studentController_1.getStudents); // Route to get all students
router.post("/students", studentController_1.addStudent); // Route to add a new student
router.delete("/students/:id", studentController_1.deleteStudent); // Route to delete a student by id
router.get("/students/:id", studentController_1.getStudentById); // Route to get a specific student by id
exports.default = router;
