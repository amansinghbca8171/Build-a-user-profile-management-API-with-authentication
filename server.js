const app = require('./src/app');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});