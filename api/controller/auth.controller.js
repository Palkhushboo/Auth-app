
 
 import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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

