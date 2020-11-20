import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as JwtStrategy } from 'passport-jwt';
import Config from './config/oauth-config';

const initPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: Config.GOOGLE_CLIENT_ID,
        clientSecret: Config.GOOGLE_CLIENT_SECRET,
        callbackURL: Config.GOOGLE_CAllBACK_URL,
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
        clientID: Config.GITHUB_CLIENT_ID,
        clientSecret: Config.GITHUB_CLIENT_SECRET,
        callbackURL: Config.GITHUB_CAllBACK_URL,
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
        secretOrKey: Config.JWT_SECRET,
      },
      async (payload, done) => {
        done(null, true);
      }
    )
  );
};

export default initPassport;
