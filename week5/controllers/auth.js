import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err);
  } else {
    console.log('Successfully connected to database');
  }
});

const isEmail = (email) => {
  return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(email);
};

export function register(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password) {
    return res.status(400).render('register', {
      message: 'Please provide a username, email and password',
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

  // check email is new
  db.query(
    'SELECT email FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        console.error(error);
        res.status(500).render('register', {
          message: 'An error occurred',
        });
      } else if (results.length > 0) {
        return res.status(409).render('register', {
          message: 'This email is already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users SET ?',
        { name: username, email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).render('register', {
              message: 'Internal server error',
            });
          } else {
            createToken(username, email, res);

            return res.status(201).redirect('/profile');
          }
        }
      );
    }
  );
}

export function login(req, res) {
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

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).render('login', {
          message: 'Internal server error',
        });
      } else if (results.length === 0) {
        return res.status(401).render('login', {
          message: 'Incorrect email or password',
        });
      } else {
        const isMatch = await bcrypt.compare(password, results[0].password);

        if (isMatch) {
          createToken(results[0].name, results[0].email, res);

          return res.status(200).redirect('/profile');
        } else {
          return res.status(401).render('login', {
            message: 'Incorrect email or password',
          });
        }
      }
    }
  );
}

function createToken(name, email, res) {
  const token = jwt.sign(
    {
      username: name,
      email: email,
    },
    process.env.JWT_SECRET
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
