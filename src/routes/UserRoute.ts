import * as express from 'express';
import UserController from '../controllers/UserController';

const router: express.Router = express();

router.get('/', UserController.getUser);

export default router;
