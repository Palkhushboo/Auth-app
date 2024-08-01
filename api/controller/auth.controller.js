import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

const JWT_SECRET = 'rjcnuhcbk457wn'; // Replace with your actual JWT secret

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate request body
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Log the error for debugging
    console.error('Error during user signup:', error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    const token = jwt.sign({ id: validUser._id }, JWT_SECRET, { expiresIn: '1h' });
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: 'Signed in successfully', user: rest });
  } catch (error) {
    next(error);
  }
};
