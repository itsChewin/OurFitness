import express from 'express';
import { welcome } from './routes/welcome.js';
import { PrismaClient } from '@prisma/client';
import { login } from './routes/login.js';
import { register } from './routes/register.js';
import { getAllRoutines } from './routes/getAllRoutines.js';
import { getRoutineById } from './routes/getRoutineById.js';
import { editRoutine } from './routes/editRoutine.js';
import { createRoutine } from './routes/createRoutine.js';
import { deleteRoutine } from './routes/deleteRoutine.js';
import { getAllGoals } from './routes/getAllGoals.js';
import { createGoal } from './routes/createGoal.js';
import { editGoal } from './routes/editGoal.js';
import { deleteGoal } from './routes/deleteGoal.js';
import { getUser } from './routes/getUser.js';
import { ErrorResponse } from './type/response.js';
import cors from 'cors';
import { verifyAccessToken } from './services/JWTService.js';

const prisma = new PrismaClient();

const app = express();

global.prisma = prisma;

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', welcome);

app.post('/login', login);

app.post('/register', register);

app.use((req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) throw new ErrorResponse('no credential found', 401);

    const verify = verifyAccessToken(token);

    if (verify.err) throw new ErrorResponse('access denied', 403);

    res.locals.userId = verify.id;
    next();
  } catch (error) {
    if (error instanceof ErrorResponse) {
      return res.status(error.statusCode).json(error);
    }
    return res.json(error);
  }
});

app.get('/me', getUser);

app.get('/notes', getAllRoutines);

app.get('/note/:noteId', getRoutineById);

app.patch('/note', editRoutine);

app.post('/note', createRoutine);

app.delete('/note/:noteId', deleteRoutine);

app.get('/comment', getAllGoals);

app.post('/comment', createGoal);

app.patch('/comment', editGoal);

app.delete('/comment', deleteGoal);

app.listen('8000', () => {
  console.log('App is listenning on http://localhost:8000 ');
});
