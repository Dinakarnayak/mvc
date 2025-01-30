import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Create and export the DataSource instance
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,  // Default port for MySQL is 3306
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, "/../models/*.ts")  // Ensuring correct path for models
  ],
  synchronize: true,  // Synchronize schema with the database (be cautious with production)
  logging: true,  // Log SQL queries and errors (helpful for debugging)
  migrations: [path.join(__dirname, "/../migrations/*.ts")],  // Add migrations if needed
  subscribers: [],  // Optionally include subscribers
});

// Initialize the connection to the database  
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);  // Exit the process if DB connection fails
  });
