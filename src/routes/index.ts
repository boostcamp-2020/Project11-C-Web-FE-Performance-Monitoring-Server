import * as express from 'express';
import loginRouter from './auth/Login';
import logRouter from './log/Log';
import projectRouter from './ProjectRoute';

const router: express.Router = express();

router.use('/oauth', loginRouter);
router.use('/log', logRouter);
router.use('/project', projectRouter);

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello typescript express!');
});

export default router;
