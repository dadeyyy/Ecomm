import { ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrat = new JwtStrategy(jwtOptions, function verify(jwt_payload, done) {
  return done(null, jwt_payload);
});

passport.use(jwtStrat);


export default passport;