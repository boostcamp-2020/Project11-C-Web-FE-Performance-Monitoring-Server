import * as express from 'express';
import * as passport from 'passport';
import loginRouter from './auth/Login';
import logRouter from './log/Log';
import projectRouter from './ProjectRoute';
import userRouter from './UserRoute';

const router: express.Router = express();

router.use('/oauth', loginRouter);
router.use('/log', logRouter);
router.use('/project', projectRouter);
router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRouter
);

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello typescript express!');
});

export default router;
