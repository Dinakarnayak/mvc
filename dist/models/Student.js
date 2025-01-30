"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const typeorm_1 = require("typeorm");
let Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_name" }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name" }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "major", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "gpa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "date_of_birth" }),
    __metadata("design:type", Date)
], Student.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "university_name" }),
    __metadata("design:type", String)
], Student.prototype, "universityName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "date_enrolled" }),
    __metadata("design:type", Date)
], Student.prototype, "dateEnrolled", void 0);
Student = __decorate([
    (0, typeorm_1.Entity)()
], Student);
exports.Student = Student;
