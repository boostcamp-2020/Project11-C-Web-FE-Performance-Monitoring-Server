import * as express from 'express';
import IssueController from '../controllers/IssueController';

const router: express.Router = express();
router.get('/', IssueController.listAllIssues);
export default router;
