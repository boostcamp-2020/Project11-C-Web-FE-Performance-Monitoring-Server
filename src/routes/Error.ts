import * as express from 'express';
import ErrorController from '../controllers/ErrorEventController';

const router: express.Router = express();

router.post('/', ErrorController.collectErrorEvent);
router.get('/', ErrorController.getAllErrorEvents);
export default router;
