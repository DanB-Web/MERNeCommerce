//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';

dotenv.config();

//Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//Routes
import productRoutes from './routes/productRoutes.js'

//Database and models
import connectDB from './config/db.js';

//Initialise and variables
const app = express();
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV || 'duh';

//DB connection
connectDB();

//Middleware - functions that you give access to the req/res objects
app.use(
  cors()
);

//Routes
app.get('/test', (_, res) => res.json('Success!'));
app.use('/api/products', productRoutes);

//Custom Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold);
});