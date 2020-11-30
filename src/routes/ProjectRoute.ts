import * as express from 'express';
import ProjectController from '../controllers/ProjectController';

const router: express.Router = express();

router.post('/', ProjectController.postProject);
router.get('/:projectId', ProjectController.getProject);
router.delete('/:projectId', ProjectController.deleteProject);

export default router;
