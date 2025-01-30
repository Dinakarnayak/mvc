import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes";
import { AppDataSource } from "./database/dataSource";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());  // Parse incoming JSON requests

// Routes setup
app.use("/api", studentRoutes);  // Use studentRoutes under the '/api' path

// Database initialization and server startup function
const initializeServer = async () => {
  try {
    // Attempt to connect to the database
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    // Construct the full URL dynamically and display it
    const serverUrl = `http://localhost:${PORT}`;

    // Start the server once the database is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on: ${serverUrl}/api`);
      console.log(`Students endpoint is available at: ${serverUrl}/api/students`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);  // Exit the process if DB connection fails
  }
};

// Call the server initialization function
initializeServer();
