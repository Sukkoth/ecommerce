const express = require('express');
const app = express();

const morgan = require('morgan');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const path = require('path');

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
app.get('/', (req, res) =>
  res.json({ message: 'Welcome to Eshop API Service' })
);
app.use('/api/products', require('./routes/Product/productRoutes'));
app.use('/api/carts', require('./routes/Cart/cartRoutes'));
app.use('/api/wishList', require('./routes/WishList/wishListRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/users', require('./routes/User/userRoutes'));
app.use('*', (req, res) =>
  res.status(404).json({ message: 'Page not found', code: '404' })
);
app.use(errorMiddleware);

module.exports = app;
