export type SignupProps = {
  username: string;
  password?: string;
  email: string;
  auth_strategy? : string;
};

export type PayloadProps = {
  id: number;
  username: string;
  email: string;
};

export type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string; // Use `Date` if you plan to parse this into a JavaScript Date object
};
