import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import initPassport from './passport';

import authRouter from './routes/auth/Login';

const app: express.Application = express();

initPassport();
app.use('/', authRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hello typescript express!');
  }
);

export default app;
