import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

  useEffect(() => {
    const userSignup = async() => {
      const data = await axios.post('/api/v1/auth/signup');
      console.log(data);
    };
    userSignup();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(123);
    
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded w-[85%] sm:w-[55%] md:w-[45%] lg:w-[30%] xl:w-[30%] 2xl:w-[25%] mx-auto px-8 pt-6 pb-8 my-6">
      <p className="text-center text-slate-600 border-b text-2xl font-bold pb-2 mb-5">Create Account</p>
      <div className="mb-3">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="name" type="text" placeholder="Enter full name" />
        {/* <p className="text-red-500 text-xs italic">Please enter your name</p> */}
      </div>
      <div className="mb-3">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="age">Age</label>
        <input className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="age" type="number" placeholder="Enter age" />
        {/* <p className="text-red-500 text-xs italic">Decimal number not allowed</p> */}
      </div>
      <div className="mb-3">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="email" type="email" placeholder="Enter email address" />
        {/* <p className="text-red-500 text-xs italic">Please enter your valid email address</p> */}
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input className="shadow appearance-none border border-red rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="password" type="password" placeholder="Enter password" />
        {/* <p className="text-red-500 text-xs italic">Please enter your password</p> */}
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="profilePic">Profile Picture</label>
        <input className="shadow appearance-none border border-red rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="profilePic" type="file" />
        {/* <p className="text-red-500 text-xs italic">Please upload png or jpg format</p> */}
      </div>
      <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
        Sign Up
      </button>
      <p className="text-sm text-slate-500 text-center mt-3">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
    </form>
  );
};

export default SignUp;