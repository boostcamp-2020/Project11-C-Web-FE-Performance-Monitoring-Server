import * as express from 'express';
import ProjectController from '../controllers/ProjectController';

const router: express.Router = express();

router.post('/', ProjectController.postProject);
// router.delete('/:projectId', ProjectController);

export default router;
