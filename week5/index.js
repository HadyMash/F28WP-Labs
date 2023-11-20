import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pagesRouter from './routes/pages.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

const port = 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'views/layouts',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', pagesRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
