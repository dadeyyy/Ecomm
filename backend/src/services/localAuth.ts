import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findExistingUser } from '../utils/userQueries';
import bcrypt from 'bcrypt';

const passportStrat = new LocalStrategy(async function verify(username, password, done) {
  try {
    console.log(username);
    const user = await findExistingUser(username);
    if (!user || user.length === 0) return done(null, false);
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) return done(null, false);
    const payload = { id: user[0].id, username: user[0].username, email: user[0].email };
    return done(null, payload);
  } catch (e) {
    return done(e);
  }
});

passport.use(passportStrat);

export default passport;
