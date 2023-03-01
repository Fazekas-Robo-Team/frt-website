import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import sequelize from './config/sequelize';
import authMiddleware from './middleware/authMiddleware';
import { exec } from 'child_process';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/blog', blogRoutes)

exec('cd .. && cd frt-frontend && npm run dev', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

