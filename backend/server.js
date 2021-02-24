//Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';

dotenv.config();

//Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//Custom Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//Database and models
import connectDB from './config/db.js';

//Initialise app and variables
const app = express();
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV || 'duh';

//DB connection
connectDB();

//Middleware - functions that you give access to the req/res objects
app.use(
  express.json(),
  cors()
);

//Normal Routes
app.get('/test', (_, res) => res.json('Success!'));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//Custom Error Middleware - make sure it is after the last routes
app.use(notFound);
app.use(errorHandler);

//Start server
app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold);
});