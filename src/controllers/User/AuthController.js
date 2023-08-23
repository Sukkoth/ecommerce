const User = require('../../models/User');
const bcrypt = require('bcrypt');
const asyncHanlder = require('express-async-handler');
const createUserValidation = require('../../validation/User/createUser');
const parseValidationErrors = require('../../utils/parseValidationErrors');
const loginValidation = require('../../validation/User/loginUser');
const generateToken = require('../../utils/generateToken');
const Cart = require('../../models/Cart');
const WishList = require('../../models/WishList');
/**
 * @desc register a user
 * @route POST /users/auth/register
 * @returns {object} user
 */
const register = asyncHanlder(async (req, res) => {
  /**
   * Add user
   * create user for the user
   */
  const { error: validationError, value: validated } =
    createUserValidation.validate(req.body, { abortEarly: false });

  if (validationError)
    return res.json(parseValidationErrors(validationError.details));

  const hashedPassword = await bcrypt.hash(validated.password, 10);

  const user = await User.create({ ...validated, password: hashedPassword });
  const cart = await Cart.create({ userId: user._id });
  const wishList = await WishList.create({ user: user._id });
  res.status(201).json({
    message: 'User created',
    user,
    cart,
    wishList,
  });
});

/**
 * @desc log in a user
 * @route POST /users/auth/login
 * @returns {object} user
 */
const login = asyncHanlder(async (req, res) => {
  const { error: validationError, value: validated } = loginValidation.validate(
    req.body,
    { abortEarly: false }
  );

  if (validationError)
    return res.json(parseValidationErrors(validationError.details));

  const user = await User.findOne({ email: validated.email });

  const passwordMatch = await bcrypt.compare(validated.password, user.password);

  if (!passwordMatch) {
    res.status(401).json({
      status: 'unauthenticated',
      message: 'Incorrect credentials',
    });
  }

  res.json({
    message: 'User found',
    user,
    token: generateToken(user._id),
  });
});

module.exports = {
  register,
  login,
};
