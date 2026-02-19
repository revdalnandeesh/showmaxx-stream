const mysql = require('mysql2/promise');
require('dotenv').config();

// Create database pool with fallback configuration
const createPool = () => {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'showmaxx',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    ssl: process.env.DB_SSL === 'require' ? {
      rejectUnauthorized: false
    } : process.env.RAILWAY_ENVIRONMENT ? {
      rejectUnauthorized: false
    } : false
  };

  console.log('Creating database pool with config:', {
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database,
    ssl: config.ssl
  });

  return mysql.createPool(config);
};

const pool = createPool();

const initDatabase = async () => {
  try {
    console.log('Initializing database connection...');
    console.log('Database config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL
    });
    
    const connection = await pool.getConnection();
    console.log('Database connection established successfully!');
    
    // Create users table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        phone VARCHAR(20),
        gender VARCHAR(10),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    console.log('✅ Users table created or already exists');
    
    connection.release();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    console.error('Database error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    throw error;
  }
};

module.exports = {
  pool,
  initDatabase
};
