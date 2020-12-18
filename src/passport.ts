import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as NaverStrategy } from 'passport-naver';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import * as dotenv from 'dotenv';
import User, { UserDocument } from './models/User';
import UserService from './services/UserService';
import Encryption from './utils/Encryption';

dotenv.config({ path: '.env' });

const initPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        process.nextTick(() => {
          return done(null, profile);
        });
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        return done(null, profile);
      }
    )
  );

  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        return done(null, profile);
      }
    )
  );

  const cookieExtractor = req => {
    return req.cookies ? req.cookies.jwt : undefined;
  };

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await UserService.findUser(payload.userId);
          if (!user || !user.status) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'pwd',
      },
      async (email: string, pwd: string, done) => {
        try {
          const user: UserDocument = await User.findOne({
            email,
            oauthId: 'local',
          });
          if (!user)
            return done(null, false, { signIn: false, causeEmail: true });
          if (Encryption.hashPwd(pwd) !== user.pwd)
            return done(null, false, { signIn: false, causeEmail: false });
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export default initPassport;
