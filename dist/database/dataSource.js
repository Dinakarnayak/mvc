"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create and export the DataSource instance
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        path_1.default.join(__dirname, "/../models/*.ts") // Ensuring correct path for models
    ],
    synchronize: true,
    logging: true,
    migrations: [path_1.default.join(__dirname, "/../migrations/*.ts")],
    subscribers: [], // Optionally include subscribers
});
// Initialize the connection to the database
exports.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database connected successfully");
})
    .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
});
