import * as express from 'express';
import UserController from '../controllers/UserController';

const router: express.Router = express();

router.get('/', UserController.getUser);
router.get('/projects', UserController.getProjects);

export default router;
