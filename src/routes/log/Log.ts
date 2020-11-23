import * as express from 'express';
import LogController from '../../controllers/LogControllers';

const router: express.Router = express();

router.post('/', LogController.collectLog);
router.get('/', LogController.getLogs);
export default router;
