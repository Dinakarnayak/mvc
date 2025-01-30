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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const dataSource_1 = require("./database/dataSource");
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware setup
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(body_parser_1.default.json()); // Parse incoming JSON requests
// Routes setup
app.use("/api", studentRoutes_1.default); // Use studentRoutes under the '/api' path
// Database initialization and server startup function
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to connect to the database
        yield dataSource_1.AppDataSource.initialize();
        console.log("✅ Database connected successfully");
        // Construct the full URL dynamically and display it
        const serverUrl = `http://localhost:${PORT}`;
        // Start the server once the database is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on: ${serverUrl}/api`);
            console.log(`Students endpoint is available at: ${serverUrl}/api/students`);
        });
    }
    catch (error) {
        console.error("❌ Database connection failed", error);
        process.exit(1); // Exit the process if DB connection fails
    }
});
// Call the server initialization function
initializeServer();
