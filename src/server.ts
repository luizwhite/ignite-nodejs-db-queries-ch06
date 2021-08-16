import express, { Request, Response } from 'express';
import 'express-async-errors';
import 'dotenv/config';

import 'reflect-metadata'; // decorators
import './database';

import { router } from './routes';

const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err);

  return res.status(500).json({
    error: err.name,
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
