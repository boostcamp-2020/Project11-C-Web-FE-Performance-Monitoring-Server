import * as express from 'express';
import ErrorController from '../controllers/ErrorEventController';

const router: express.Router = express();

router.post('/:projectId', ErrorController.collectErrorEvent);
router.get('/', ErrorController.getAllErrorEvents);
router.get('/issue/:issueId', ErrorController.listIssueErrorEvents);
export default router;
