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
  res.render('profile', {
    user: req.user,
  });
});

const pages = router;
export default pages;
