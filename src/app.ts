import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import initPassport from './passport';
import routerBundle from './routes/index';

const app: express.Application = express();

initPassport();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', routerBundle);

export default app;
