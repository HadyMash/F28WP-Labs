import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyJWTCookie, verifyUnauthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyUnauthenticated, (req, res) => {
  res.render('index');
});

router.get('/register', verifyUnauthenticated, (req, res) => {
  res.render('register');
});

router.get('/login', verifyUnauthenticated, (req, res) => {
  res.render('login');
});

router.get('/profile', verifyJWTCookie, (req, res) => {
  try {
    if (!req.cookies.token) throw new Error('No token found');
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.render('profile', {
      user: {
        name: decoded.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

const pages = router;
export default pages;
