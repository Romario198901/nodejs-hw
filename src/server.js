import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { pino } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(pino);

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);

app.use(cors());

app.use(helmet());
app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
