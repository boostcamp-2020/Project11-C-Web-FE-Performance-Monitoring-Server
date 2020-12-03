import * as express from 'express';
import CommentController from '../controllers/CommentController';

const router: express.Router = express();
router.post('/', CommentController.addComment);
router.put('/', CommentController.editComment);
router.delete(
  '/issue/:issueId/comment/:commentId',
  CommentController.deleteComment
);
export default router;
