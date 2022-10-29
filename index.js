import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";
import methodOverride from 'method-override';
import flash from 'connect-flash';
import { assignResLocals, sessionConfig } from "./middlewares.js";
import { router as basicFunc } from "./Routes/basicFunction.js";
import { router as userRoutes } from "./Routes/userRoutes.js";
import { ExpressError } from "./ExpressError.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(() => { console.log('Connected to database') })
    .catch((e) => { console.log('Cannot connect to database', e) });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session(sessionConfig))
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());
app.use(assignResLocals);

app.use('/', basicFunc);
app.use('/user/:id', userRoutes);

app.all('*', (req, res, next) => {
    throw new ExpressError('Page not Found', 404);
});

app.use((err, req, res, next) => {
    console.log(err.name);
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!!';
    res.status(status).render('./error.ejs', { err });
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
});
