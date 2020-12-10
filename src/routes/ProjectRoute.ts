import * as express from 'express';
import ProjectController from '../controllers/ProjectController';

const router: express.Router = express();

router.post('/', ProjectController.postProject);
router.get('/:projectId', ProjectController.getProject);
router.get('/v2/:projectId', ProjectController.getJoinedProject);
router.delete('/:projectId', ProjectController.deleteProject);
router.post('/:projectId/member', ProjectController.postMember);
router.delete('/:projectId/member/:memberId', ProjectController.deleteMember);

export default router;
