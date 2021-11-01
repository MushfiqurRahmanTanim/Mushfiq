import express from 'express';
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { generateIdToken } from '../utils/token/index.js';
import { protect } from '../middleware/protect.js';
const router = express.Router();

const secretKey = process.env.SECRET_KEY;

router.get('/', (req, res) => {
  res.send('this is auth router');
});

router.post('/register', async (req, res) => {
  const { name, email, work, password, phone } = req.body;
  if (!name || !email || !work || !password || !phone) {
    return res.status(422).json({ error: 'Plz fill up all' });
  }

  try {
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(422).json({ error: 'Email already exist' });
    }
    //create new user
    const newUser = new User({
      name,
      email,
      work,
      phone,
      password,
    });
    //save user and return respond
    await newUser.save();
    res.status(201).json({ message: 'user register successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Log In Router

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    throw new Error('User not found');
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        work: user.work,
        phone: user.phone,
        token: generateIdToken(user._id),
      },
      message: `Welcome back ${user.name}!`,
    });
    console.log(user)
  } else {
    res.status(401);
    throw new Error('Password is incorrect');
  }
});

router.get('/about',protect)


export default router;


