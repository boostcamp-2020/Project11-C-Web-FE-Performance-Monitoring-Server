import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import Config from '../config/oauth-config';

const GoogleLogin = async (req: express.Request, res: express.Response) => {
  passport.authenticate(
    'google',
    { failureRedirect: '/' },
    (err: Error, user: any) => {
      if (err) return false;

      const email: string = user.emails[0].value;
      const token = jwt.sign({ userEmail: email }, Config.JWT_SECRET);

      if (token) {
        res.cookie('jwt', token, { domain: 'localhost', httpOnly: true });
        return res.redirect('http://localhost:8000/main');
      }

      throw new Error('not found token');
    }
  )(req, res);
};

const GithubLogin = async (req: express.Request, res: express.Response) => {
  passport.authenticate(
    'github',
    { failureRedirect: '/' },
    (err: Error, user: any) => {
      if (err) return false;

      const email: string = user.emails[0].value;
      const token = jwt.sign({ userEmail: email }, Config.JWT_SECRET);

      if (token) {
        res.cookie('jwt', token, { domain: 'localhost', httpOnly: true });
        return res.redirect('http://localhost:8000/main');
      }

      throw new Error('not found token');
    }
  )(req, res);
};

export default { GoogleLogin, GithubLogin };
