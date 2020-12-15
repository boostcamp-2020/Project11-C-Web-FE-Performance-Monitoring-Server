import * as express from 'express';
import AlertController from '../controllers/AlertController';

const router: express.Router = express();
router.get('/', AlertController.listAlerts);

export default router;
