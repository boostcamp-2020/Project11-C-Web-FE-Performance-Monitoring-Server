import * as express from 'express';
import ProjectController from '../controllers/ProjectController';
import ChartController from '../controllers/ChartController';

const router: express.Router = express();

router.post('/', ProjectController.postProject);
router.get('/:projectId', ProjectController.getProject);
router.get('/v2/:projectId', ProjectController.getJoinedProject);
router.delete('/:projectId', ProjectController.deleteProject);
router.post('/:projectId/member', ProjectController.postMember);
router.delete('/:projectId/member/:memberId', ProjectController.deleteMember);
router.get('/:projectId/chart/dailyError', ChartController.getDailyError);
router.get('/:projectId/chart/issue', ChartController.getIssue);
router.get('/:projectId/chart/tag', ChartController.getTag);

export default router;
