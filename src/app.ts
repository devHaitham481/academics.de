import express from 'express';
import sunRoutes from './routes/sun.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(sunRoutes);
app.use(errorMiddleware);

export default app;
