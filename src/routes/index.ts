import * as express from 'express';
import * as passport from 'passport';
import loginRouter from './auth/Login';
import logRouter from './log/Log';
import errorEventRouter from './Error';
import issueRouter from './Issue';
import projectRouter from './ProjectRoute';
import userRouter from './UserRoute';

const router: express.Router = express();
router.use('/oauth', loginRouter);
router.use('/log', logRouter);
router.use('/errorevent', errorEventRouter);
router.use('/issue', issueRouter);
router.use('/project', projectRouter);

router.use(
  '/project',
  passport.authenticate('jwt', { session: false }),
  projectRouter
);

router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRouter
);

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello typescript express!');
});
router.get(
  '/test',
  (req: any, res: express.Response, next: express.NextFunction) => {
    throw new Error('testets');
  }
);
export default router;
