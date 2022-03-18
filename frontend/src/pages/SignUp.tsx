import { useState } from 'react';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useGlobalDispatch } from '../context/userContext';

const SignUp = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch: any = useGlobalDispatch();

  const navigate: NavigateFunction = useNavigate();

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const {name, value} = e.target as HTMLInputElement;
    setUser({ ...user, [name]: value });
  };

  const userSignup = async() => {
    try {
      const res: AxiosResponse<any> = await axios.post('/api/v1/auth/signup', user);
      if (res.status === 201) {
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
    userSignup();
    setUser({
      name: '',
      email: '',
      password: ''
    });
  }

  return (
    <div className="h-[100vh] grid place-items-center mb-8 sm:mb-0">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded w-[85%] sm:w-[50%] md:w-[35%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%] mx-auto px-8 pt-6 pb-8 my-6">
        <p className="text-center text-slate-600 border-b text-2xl font-bold pb-2 mb-5">Create Account</p>
        <div className="mb-3">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input name="name" value={user.name} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="name" type="text" placeholder="Enter full name" />
        </div>
        <div className="mb-3">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input name="email" value={user.email} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="email" type="email" placeholder="Enter email address" />
        </div>
        <div className="mb-3">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input name="password" value={user.password} onChange={handleInputChange} className="shadow appearance-none border border-red rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="password" type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
          Sign Up
        </button>
        <p className="text-sm text-slate-500 text-center mt-3">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;