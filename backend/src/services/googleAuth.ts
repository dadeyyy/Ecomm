import passport = require('passport');
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { query } from '../config/db';
import { createUser } from '../utils/userQueries';

const googleStrat = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  async function (accessToken, refreshToken, profile, cb) {
    //Check for user
    //If there is no user, create a user
    const { name, email } = profile._json;

    const q = 'SELECT * FROM users WHERE email = $1';
    try {
      const findEmailQuery = await query(q, [email]);
      const queryRows = findEmailQuery.rows;
      if (queryRows.length > 0) {
        const payload = { id: queryRows[0].id, username: queryRows[0].username, email: queryRows[0].email };
        return cb(null, payload);
      }
      const newUser = await createUser({ username: name as string, email: email as string, auth_strategy: 'google' });
      //Find user in db;
      const findUserQuery = 'SELECT * FROM users WHERE email = $1';
      const findExistingEmail = await query(findUserQuery, [email]);

      if (findExistingEmail.rows.length > 0) {
        const newUserPayload = {
          id: findExistingEmail.rows[0].id,
          username: findExistingEmail.rows[0].username,
          email: findExistingEmail.rows[0].email,
        };
        return cb(null, newUserPayload);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

passport.use(googleStrat);

export default passport;