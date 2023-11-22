import jwt from 'jsonwebtoken';
import { userExists } from '../controllers/db.js';

export async function verifyJWTCookie(req, res, next) {
  try {
    // check token exists
    if (!req.cookies.token) throw new Error();
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // check if user exists
    const existingUser = await userExists(decoded.email);
    if (!existingUser) throw new Error();

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch (_) {
    res.clearCookie('token');
    return res.status(401).redirect('/');
  }
}

export function verifyUnauthenticated(req, res, next) {
  try {
    if (!req.cookies.token) throw new Error();
    jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.redirect('/profile');
  } catch (_) {
    next();
  }
}
