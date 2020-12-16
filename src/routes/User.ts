import * as express from 'express';
import UserController from '../controllers/UserController';

const router: express.Router = express();

router.get('/', UserController.getUser);
router.get('/all', UserController.getUsers);
router.get('/projects', UserController.getProjects);
router.get('/:email', UserController.getUserByEmail);

export default router;
