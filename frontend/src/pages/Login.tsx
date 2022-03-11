import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-white shadow-md rounded w-[80%] sm:w-[50%] md:w-[35%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%] mx-auto px-8 pt-6 pb-8">
      <div className="text-5xl border-2 border-slate-400 rounded-full w-fit p-3 mx-auto mb-4">
        <FaRegUser className="text-slate-500" />
      </div>
      <div className="mb-3">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="email" type="email" placeholder="Enter email" />
        {/* <p className="text-red-500 text-xs italic">Please enter your valid email address</p> */}
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input className="shadow appearance-none border border-red rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="password" type="password" placeholder="Enter password" />
        {/* <p className="text-red-500 text-xs italic">Please enter your password</p> */}
      </div>
      <button type="button" className="bg-green-500 text-white font-bold w-full py-2 rounded">
        Login
      </button>
      <p className="text-sm text-slate-500 text-center mt-3">Don't have account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
    </div>
  );
};

export default Login;