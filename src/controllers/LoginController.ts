import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import LoginService from '../services/LoginService';

dotenv.config({ path: '.env' });

const createToken = data => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

const googleLogin = (req: express.Request, res: express.Response) => {
  passport.authenticate(
    'google',
    { failureRedirect: process.env.ADMIN_ADDR_LOGIN },
    async (err: Error, user: any) => {
      if (err) return false;

      const [userId, userStatus, recentProject] = await LoginService.saveData(
        user,
        'google'
      );
      const token: string = createToken({ userId });

      if (!userStatus) throw new Error('deleted user');

      const redirectAddr = recentProject
        ? `${process.env.ADMIN_ADDR_MAIN}/issues/${recentProject}`
        : `${process.env.ADMIN_ADDR_MAIN}`;

      if (token) {
        res.cookie('jwt', token, { httpOnly: true });
        return res.redirect(redirectAddr);
      }

      throw new Error('not found token');
    }
  )(req, res);
};

const githubLogin = (req: express.Request, res: express.Response) => {
  passport.authenticate(
    'github',
    { failureRedirect: process.env.ADMIN_ADDR_LOGIN },
    async (err: Error, user: any) => {
      if (err) return false;

      const [userId, userStatus, recentProject] = await LoginService.saveData(
        user,
        'github'
      );
      const token: string = createToken({ userId });

      if (!userStatus) throw new Error('deleted user');

      const redirectAddr = recentProject
        ? `${process.env.ADMIN_ADDR_MAIN}/issues/${recentProject}`
        : `${process.env.ADMIN_ADDR_MAIN}`;

      if (token) {
        res.cookie('jwt', token, { httpOnly: true });
        return res.redirect(redirectAddr);
      }

      throw new Error('not found token');
    }
  )(req, res);
};

const naverLogin = async (req: express.Request, res: express.Response) => {
  passport.authenticate(
    'naver',
    { failureRedirect: process.env.ADMIN_ADDR_LOGIN },
    (err: Error, user: any) => {
      if (err) return false;

      const [email] = user.emails;
      const token = jwt.sign(
        { userEmail: email.value },
        process.env.JWT_SECRET
      );
      LoginService.saveData(user, 'naver');

      if (token) {
        res.cookie('jwt', token, { httpOnly: true });
        return res.redirect(process.env.ADMIN_ADDR_MAIN);
      }

      throw new Error('not found token');
    }
  )(req, res);
};

const postSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const result: string | undefined = await LoginService.createUser(req.body);
    if (result) {
      res.cookie('jwt', createToken({ userId: result }), { httpOnly: true });
      res.json({ signUp: true });
    } else {
      res.json({ signUp: false });
    }
  } catch (err) {
    res.json(err);
  }
};

const postSignIn = (req: express.Request, res: express.Response) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (!user) return res.json(info);
    if (!user.status) throw new Error('deleted user');

    res.cookie('jwt', createToken({ userId: user._id }), { httpOnly: true });
    res.json({ signIn: true });
  })(req, res);
};

export default { googleLogin, githubLogin, naverLogin, postSignUp, postSignIn };
