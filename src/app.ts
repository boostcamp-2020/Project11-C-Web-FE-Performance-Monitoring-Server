import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as cors from 'cors';
// import * as acent from '@acent/node';
import initPassport from './passport';
import routerBundle from './routes/index';
import getConnection from './mongo';

const app: express.Application = express();
getConnection();
initPassport();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// acent.init({ dsn: 'http://localhost:3000/errorevent' });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', routerBundle);
// app.use(acent.Handlers.errorHandler);
export default app;
