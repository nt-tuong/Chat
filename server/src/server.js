const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const { initSocket, getIO } = require('./sockets/index');
initSocket(server);

// Connect to database
connectDB();

// Socket.IO connection
const io = getIO();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

