import * as express from 'express';
import * as passport from 'passport';
import loginRouter from './auth/Login';
import errorEventRouter from './Error';
import issueRouter from './Issue';
import projectRouter from './Project';
import userRouter from './User';
import alertRouter from './Alert';
import LoginController from '../controllers/LoginController';

const router: express.Router = express();
router.use('/oauth', loginRouter);
router.use('/errorevent', errorEventRouter);
router.use(
  '/issue',
  passport.authenticate('jwt', { session: false }),
  issueRouter
);

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
router.use(
  '/alert',
  passport.authenticate('jwt', { session: false }),
  alertRouter
);

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello typescript express!');
});

router.get(
  '/isLogin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ success: 200, userInfo: req.user });
  }
);

router.post('/signUp', LoginController.postSignUp);
router.post('/signIn', LoginController.postSignIn);
router.get('/signOut', LoginController.getSingOut);

export default router;
