import * as express from 'express';
import IssueController from '../controllers/IssueController';
import CommentController from '../controllers/CommentController';

const router: express.Router = express();
router.get('/', IssueController.listAllIssues);

// comment CRUD
router.post('/comment', CommentController.addComment);
router.put('/comment', CommentController.editComment);
router.delete('/:issueId/comment/:commentId', CommentController.deleteComment);

export default router;
