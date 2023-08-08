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

/**
{
    "electronics": "64d0d6ff27ab8867b1540f03",
    "home and living": "64d0d70c27ab8867b1540f05",
    "Beauty & Personal Care": "64d0d71227ab8867b1540f07",
    "Books" :"64d0d72527ab8867b1540f09",
    "Sports & Outdoors": "64d0d73127ab8867b1540f0b",
    "Food & Beverages" : "64d0d73e27ab8867b1540f0f",
    "Clothing":"64d0dfa0711cecdf72c38081"
}
*/
