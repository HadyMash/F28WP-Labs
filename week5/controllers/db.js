import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

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

/**
 * Returns a user from the database
 * @param {string} email email to check
 * @returns returns user or null if user doesn't exist
 * @throws error if database error
 */
export function getUser(email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Check if a user exists in the database
 * @param {string} email email to check
 * @returns true if user exists, false otherwise
 * @throws error if database error
 */
export function userExists(email) {
  return getUser(email).then((user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
}

/**
 * Add a new user to the database
 * @param {string} name
 * @param {string} email user's email
 * @param {string} hashedPassword
 * @returns user object
 */
export function addUser(name, email, hashedPassword) {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users SET ?',
      { name, email, hashedPassword },
      (err, results) => {
        console.log('results:', results);
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          resolve({
            id: results.insertId,
            name,
            email,
            hashedPassword,
          });
        }
      }
    );
  });
}
