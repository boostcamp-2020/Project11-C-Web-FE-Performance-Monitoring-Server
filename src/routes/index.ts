import * as express from 'express';
import loginRouter from './auth/Login';
import logRouter from './log/Log';
import errorEventRouter from './Error';
import issueRouter from './Issue';

const router: express.Router = express();
router.use('/oauth', loginRouter);
router.use('/log', logRouter);
router.use('/errorevent', errorEventRouter);
router.use('/issue', issueRouter);

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
