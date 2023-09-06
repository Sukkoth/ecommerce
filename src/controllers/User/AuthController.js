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
    return res.status(422).json(parseValidationErrors(validationError.details));

  const hashedPassword = await bcrypt.hash(validated.password, 10);

  const userFound = await User.findOne({ email: validated.email });

  if (userFound) {
    return res.status(422).json({
      message: 'Could not create user',
      code: '422',
      details: {
        email: {
          path: 'email',
          message: 'Email address is already taken',
        },
      },
    });
  }

  try {
    const user = await User.create({
      ...validated,
      password: hashedPassword,
      email: validated.email.toLowerCase(),
    });

    await Cart.create({ user: user._id, items: [] });
    await WishList.create({ user: user._id, items: [] });

    let withoutPassword = { ...user._doc };
    delete withoutPassword.password;

    res.status(201).json({
      message: 'User created',
      user: withoutPassword,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('ERROR WHILE CREATING USER', error);
    res.status(500).json({
      message: 'Failed to create user',
      error,
    });
  }
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
    return res.status(422).json(parseValidationErrors(validationError.details));

  const user = await User.findOne({ email: validated.email.toLowerCase() });

  if (!user) {
    res.status(401).json({
      status: 'unauthenticated',
      message: 'Incorrect credentials',
    });
  }

  const passwordMatch = await bcrypt.compare(validated.password, user.password);

  if (!passwordMatch) {
    res.status(401).json({
      status: 'unauthenticated',
      message: 'Incorrect credentials',
    });
  }

  let withoutPassword = { ...user._doc };
  delete withoutPassword.password;

  res.json({
    message: 'User found',
    user: withoutPassword,
    token: generateToken(user._id),
  });
});

module.exports = {
  register,
  login,
};
