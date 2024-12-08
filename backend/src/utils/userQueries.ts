import { SignupProps, UserProps } from '../interfaces/AuthTypes';
import { query } from '../config/db';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const findExistingUser = async (username: string): Promise<UserProps[]> => {
  try {
    const queryString = 'SELECT * FROM users WHERE username = $1';
    const result = await query(queryString, [username]);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    throw new Error('Error finding user');
  }
};

export const createUser = async ({ username, email, password, auth_strategy }: SignupProps) => {
  try {
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const createUserQueryString = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)`;
      const createdUser = await query(createUserQueryString, [username, email, hashPassword]);
      return createdUser;
    }

    const createUserNoPassQueryString = `
    INSERT INTO users (username, email, auth_strategy)
    VALUES ($1, $2, $3)`;
    const createUserNoPassword = await query(createUserNoPassQueryString, [username, email, auth_strategy]);
    return createUserNoPassword;
  } catch (e) {
    console.log(e);
  }
};

