import jwt from 'jsonwebtoken';

export function verifyJWTCookie(req, res, next) {
  try {
    if (!req.cookies.token) throw new Error();
    jwt.verify(req.cookies.token, process.env.JWT_SECRET);
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
