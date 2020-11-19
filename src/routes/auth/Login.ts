import * as express from 'express';
import * as passport from 'passport';
import LoginController from '../../controllers/LoginController';

const router: express.Router = express();

router.get(
  '/oauth',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/oauth/github', passport.authenticate('github'));
router.get('/oauth/callback', LoginController.GoogleLogin);
router.get('/oauth/github/callback', LoginController.GithubLogin);

export default router;
