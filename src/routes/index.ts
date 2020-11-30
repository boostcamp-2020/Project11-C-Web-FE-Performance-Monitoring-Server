import * as express from 'express';
import * as passport from 'passport';
import loginRouter from './auth/Login';
import logRouter from './log/Log';
<<<<<<< HEAD
import projectRouter from './ProjectRoute';
=======
import userRouter from './UserRoute';
>>>>>>> feat: User 조회 로직 추가

const router: express.Router = express();

router.use('/oauth', loginRouter);
router.use('/log', logRouter);
<<<<<<< HEAD
router.use('/project', projectRouter);
=======
router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRouter
);
>>>>>>> feat: User 조회 로직 추가

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello typescript express!');
});

export default router;
