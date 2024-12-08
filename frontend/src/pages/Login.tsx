import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/input';
import Button from '../components/button';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import googleIcon from '../assets/google.svg';
import { backendUrl } from '../lib/backendUrl';

const Login = () => {
  const auth = useAuth();
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const payload = {
      username: target.username.value,
      password: target.password.value,
    };
    if (payload.username !== '' || payload.password !== '') {
      auth?.login(payload);
    } else {
      toast.error('Username or password cannot be blank!');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-10 border border-black p-10">
        <Input
          labelName="username"
          inputClassName="border border-black p-2 "
          inputProps={{ type: 'text', name: 'username', id: 'username' }}
        />
        <Input
          labelName="password"
          inputClassName="border border-black p-2"
          inputProps={{ type: 'password', name: 'password', id: 'password' }}
        />
        <div className="flex flex-col gap-5">
          <Button btnName="Login" btnClassName="bg-blue-300 rounded-lg py-3" btnProps={{ type: 'submit' }} />
          <button
            className="rounded-lg py-3 border-2 flex justify-center gap-4 items-center hover:bg-slate-100"
            onClick={handleGoogleLogin}
          >
            {' '}
            <img className="max-w-7" src={googleIcon} alt="" />
            <span className="font-medium">Login with google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
