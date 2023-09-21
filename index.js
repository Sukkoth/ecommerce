const express = require('express');
const app = express();
const env = require('./config/env');
const connectToDatabase = require('./config/db');
const morgan = require('morgan');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const cors = require('cors');
const path = require('path');
connectToDatabase();

// Allow requests from specified origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://eshop-2fzq.onrender.com',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', require('./src/routes/Product/productRoutes'));
app.use('/api/carts', require('./src/routes/Cart/cartRoutes'));
app.use('/api/wishList', require('./src/routes/WishList/wishListRoutes'));
app.use('/api/order', require('./src/routes/Order/orderRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/users', require('./src/routes/User/userRoutes'));
app.use('/', require('./src/routes/Payment/paymentRoute'));
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
