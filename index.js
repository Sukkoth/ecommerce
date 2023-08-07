const express = require('express');
const app = express();
const env = require('./config/env');
const connectToDatabase = require('./config/db');
const morgan = require('morgan');
const errorMiddleware = require('./src/middleware/errorMiddleware');

connectToDatabase();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', require('./src/routes/Product/productRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/users', require('./src/routes/User/userRoutes'));
app.use(errorMiddleware);

app.listen(env.app_port, () =>
    console.log(`server running on port ${env.app_port}`)
);
