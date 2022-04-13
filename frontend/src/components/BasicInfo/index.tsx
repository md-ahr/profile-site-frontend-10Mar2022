import { FaRegEnvelope } from 'react-icons/fa';
import { useGlobalState } from '../../context/userContext';
import ModalBox from '../Modals/EditModalBox';

const BasicInfo = (): JSX.Element => {

  const { user }: any = useGlobalState() || {};

  return (
    <div className="bg-white shadow rounded px-8 pt-6 pb-8 ml-0 lg:ml-0 mt-5">
        <div className="">
        <div className="flex items-center">
            <h2 className="text-slate-700 text-md md:text-xl xl:text-2xl font-bold pb-0 mb-0">Basic Information</h2>
            <ModalBox />
        </div>
        <div className="flex flex-wrap">
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Age</p>
              {user && user.age ? (
                <p className="text-sm sm:text-md text-slate-700 font-bold">{user.age} Years</p>
              ) : (
                <p className="text-sm text-slate-400 font-medium">Not available</p>
              )}
            </div>
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Years of Experience</p>
              {user && user.userExperience ? (
                <p className="text-sm sm:text-md text-slate-700 font-bold">{user.userExperience} Years</p>
              ) : (
                <p className="text-sm text-slate-400 font-medium">Not available</p>
              )}
            </div>
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Phone</p>
              {user && user.phone ? (
                <p className="text-sm sm:text-md text-slate-700 font-bold">{user.phone}</p>
              ) : (
                <p className="text-sm text-slate-400 font-medium">Not available</p>
              )}
            </div>
            <div className="mt-6 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Email</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold" role="userEmail">{user && user.email}</p>
            </div>
            <div className="mt-6 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Location</p>
              {user && user.userLocation ? (
                <p className="text-sm sm:text-md text-slate-700 font-bold">{user.userLocation}</p>
              ) : (
                <p className="text-sm text-slate-400 font-medium">Not available</p>
              )}
            </div>
        </div>
        <a href="mailto:example@gmail.com" className="flex items-center text-sm justify-center border-2 text-orange-500 border-orange-500 w-32 rounded py-2 mt-8 hover:bg-orange-500 hover:text-white transition ease duration-500">
            <FaRegEnvelope className="text-[16px] mr-2" />
            <span className="font-medium">Sent Email</span>
        </a>
        </div>
    </div>
  );
};

export default BasicInfo;