
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { username: user.username ,userId:user._id}
    console.log('payload', payload)
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default {
  login,
  register,
};