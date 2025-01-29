import { Sequelize } from 'sequelize';

// Set up your database connection
const sequelize = new Sequelize('mvc_contact', 'root', 'Asd952128#', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc. based on your setup
  logging: false,    // Optional: Disable SQL logging
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful!');
    await sequelize.sync({ force: false });  // This will sync all models with the database.
    console.log('Database synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export { sequelize };
