import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useGlobalDispatch } from '../context/userContext';

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const dispatch: any = useGlobalDispatch();

  const navigate: NavigateFunction = useNavigate();

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const {name, value} = e.target as HTMLInputElement;
    setUser({ ...user, [name]: value });
  };

  const userLogin = async() => {
    try {
      const res: AxiosResponse<any> = await axios.post('/api/v1/auth/login', user);
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const user: any = localStorage.getItem('user');
        dispatch({ type: 'success', value: { token: res.data.token, user: JSON.parse(user) } });
        navigate(`/profile/${res.data.user._id}`);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        toast.error(err.response?.data.message);
        dispatch({ type: 'failure', value: { token: '', user: '' } });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    userLogin();
    setUser({
      email: '',
      password: ''
    });
  }

  return (
    <div className="h-[100vh] grid place-items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded w-[85%] sm:w-[50%] md:w-[35%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%] mx-auto px-8 pt-6 pb-8">
        <div className="text-5xl border-2 border-slate-400 rounded-full w-fit p-3 mx-auto mb-4">
          <FaRegUser className="text-slate-500" />
        </div>
        <div className="mb-3">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input name="email" value={user.email} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="email" type="email" placeholder="Enter email" />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input name="password" value={user.password} onChange={handleInputChange} className="shadow appearance-none border border-red rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="password" type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
          Login
        </button>
        <p className="text-sm text-slate-500 text-center mt-3">Don't have account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;