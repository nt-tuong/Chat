const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB || 'chat_db',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});


// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Test connection function
const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL Connected successfully');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('PostgreSQL connection test:', result.rows[0].now);
    
    client.release();
    return true;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
    throw error;
  }
};

// Alternative: Use connection string if provided
if (process.env.POSTGRES_URI) {
  const poolFromURI = new Pool({
    connectionString: process.env.POSTGRES_URI,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  
  // Replace the pool if URI is provided
  Object.assign(pool, poolFromURI);
}

module.exports = {
  pool,
  connectPostgres,
  query: (text, params) => pool.query(text, params),
};

