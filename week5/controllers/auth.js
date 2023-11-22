import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUser, userExists, addUser } from './db.js';

const isEmail = (email) => {
  return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(email);
};

export async function register(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render('register', {
      message: 'Please provide a name, email and password',
    });
  }

  if (!isEmail(email)) {
    return res.status(400).render('register', {
      message: 'Please provide a valid email address',
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).render('register', {
      message: 'Passwords do not match',
    });
  }

  try {
    // check email is new
    const newEmail = !(await userExists(email));
    if (!newEmail) {
      return res.status(409).render('register', {
        message: 'This email is already taken',
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // add user to database
    const user = await addUser(name, email, hashedPassword);

    if (!user) {
      return res.status(500).render('register', {
        message: 'Internal server error',
      });
    }

    // return token to user and direct them to the profile page
    createToken(user.id, name, email, res);
    return res.status(201).redirect('/profile');
  } catch (error) {
    console.error(error);
    return res.status(500).render('register', {
      message: 'Internal server error',
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', {
      message: 'Please provide an email and password',
    });
  }

  if (!isEmail(email)) {
    return res.status(400).render('login', {
      message: 'Please provide a valid email address',
    });
  }

  try {
    const user = await getUser(email);

    if (!user) {
      return res.status(401).render('login', {
        message: 'Incorrect email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isMatch) {
      createToken(user.id, user.name, user.email, res);
      return res.status(200).redirect('/profile');
    } else {
      return res.status(401).render('login', {
        message: 'Incorrect email or password',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render('login', {
      message: 'Internal server error',
    });
  }
}

/**
 * Created a jwt token and stores it in a cookie attached to the response
 * @param {int} id user id
 * @param {string} name
 * @param {string} email
 * @param {*} res
 */
function createToken(id, name, email, res) {
  const token = jwt.sign(
    {
      id,
      name,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
}

export function logout(req, res) {
  res.clearCookie('token');
  res.status(200).render('index');
}
