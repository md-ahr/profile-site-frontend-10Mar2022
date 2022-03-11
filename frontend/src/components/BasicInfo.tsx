import { FaRegEnvelope, FaRegEdit } from 'react-icons/fa';
import ModalBox from '../components/ModalBox';

const BasicInfo = () => {
  return (
    <div className="bg-white shadow rounded px-8 pt-6 pb-8 ml-0 lg:ml-0 mt-6 md:mt-0">
        <div className="">
        <div className="flex items-center flex-wrap">
            <h2 className="text-slate-700 basis-[100%] sm:basis-[30%] md:basis-[30%] text-md md:text-xl xl:text-2xl font-bold pb-0 mb-3 sm:mb-0">Basic Information</h2>
            <ModalBox name="Add Info" />
            <button type="button" className="text-sm md:text-md text-slate-500 basis-[3%] border-2 border-slate-500 px-3 py-2 ml-6 lg:ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
              <FaRegEdit />
            </button>
        </div>
        <div className="flex flex-wrap">
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Age</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold">28 Years</p>
            </div>
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Years of Experience</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold">3 Years</p>
            </div>
            <div className="mt-5 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Phone</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold">+880 1777 335813</p>
            </div>
            <div className="mt-6 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Email</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold">ahr.web.pro@gmail.com</p>
            </div>
            <div className="mt-6 w-[100%] sm:w-[50%] lg:w-[33%]">
              <p className="text-sm sm:text-md text-slate-500 font-medium uppercase">Location</p>
              <p className="text-sm sm:text-md text-slate-700 font-bold">Dhaka, Bangladesh</p>
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