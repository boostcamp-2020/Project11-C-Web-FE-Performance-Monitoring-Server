import * as express from 'express';
import * as passport from 'passport';
import LoginController from '../../controllers/LoginController';

const router: express.Router = express();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/github', passport.authenticate('github'));
router.get('/naver', passport.authenticate('naver'));

router.get('/google/callback', LoginController.googleLogin);
router.get('/github/callback', LoginController.githubLogin);
router.get('/naver/callback', LoginController.naverLogin);

export default router;
