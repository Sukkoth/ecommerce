const router = require('express').Router({ mergeParams: true });
const authController = require('../../controllers/User/AuthController');

/**
 * @desc register a new user
 * @route POST users/auth/register
 */
router.post('/register', authController.register);

/**
 * @desc logs in a new user
 * @route POST users/auth/login
 */
router.post('/login', authController.login);

module.exports = router;
