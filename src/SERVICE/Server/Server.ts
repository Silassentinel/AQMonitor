/**
 * This will be the main server file.
 */
// Imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// import routes
import FallBackRoute from '../Routes/Fallback';

// Config
dotenv.config();

const start = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // routes
  app.use('*', FallBackRoute); // fallback routes

  app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
  );
};

export default start;
