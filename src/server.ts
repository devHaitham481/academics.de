import 'dotenv/config';
import app from './app';
import { config } from './config';

const server = app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('server closed');
    process.exit(0);
  });
});
