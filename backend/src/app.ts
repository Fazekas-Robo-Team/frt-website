import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import sequelize from './config/sequelize';
import authMiddleware from './middleware/authMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

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
