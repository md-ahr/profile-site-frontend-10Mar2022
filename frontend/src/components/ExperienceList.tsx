import { FaRegEdit } from 'react-icons/fa';

const ExperienceList = () => {
  return (
    <div className="bg-white shadow rounded px-8 pt-6 pb-8 ml-0 lg:ml-0 mt-6">
        <div className="flex items-center flex-wrap">
            <h2 className="text-slate-700 basis-[100%] sm:basis-[30%] md:basis-[30%] text-md md:text-xl xl:text-2xl font-bold mb-3 sm:mb-0">Experience</h2>
            <button type="button" className="text-green-500 basis-[auto] text-xs sm:text-sm border-2 border-green-500 rounded font-medium px-4 py-2 ml-0 sm:ml-6 lg:ml-8 hover:bg-green-500 hover:text-white transition ease duration-500">Add Experience</button>
            <button type="button" className="text-md text-slate-500 basis-[3%] border-2 border-slate-500 px-3 py-2 ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
                <FaRegEdit />
            </button>
        </div>
        <div className="flex items-center flex-wrap mt-7">
            <div className="bg-green-500 w-[70px] h-[70px] grid place-items-center rounded-full p-3 mx-auto sm:mx-0">
                <p className="text-white font-bold">CPY</p>
            </div>
            <div className="basis-[100%] sm:basis-[80%] border-b text-center sm:text-left pb-6 ml-0 sm:ml-8 mt-3 sm:mt-0">
                <p className="text-green-500 font-bold">Rokomari.com</p>
                <p className="text-sm text-slate-500 my-1">Front End Developer</p>
                <p className="text-sm text-slate-400">Nov 2018 - Present | Dhaka, Bangladeh</p>
            </div>
        </div>
        <div className="flex items-center flex-wrap mt-7">
            <div className="bg-green-500 w-[70px] h-[70px] grid place-items-center rounded-full p-3 mx-auto sm:mx-0">
                <p className="text-white font-bold">CMP</p>
            </div>
            <div className="basis-[100%] sm:basis-[80%] border-b text-center sm:text-left pb-6 ml-0 sm:ml-8 mt-3 sm:mt-0">
                <p className="text-green-500 font-bold">Rokomari.com</p>
                <p className="text-sm text-slate-500 my-1">Front End Developer</p>
                <p className="text-sm text-slate-400">Nov 2018 - Present | Dhaka, Bangladeh</p>
            </div>
        </div>
        <div className="flex items-center flex-wrap mt-7">
            <div className="bg-green-500 w-[70px] h-[70px] grid place-items-center rounded-full p-3 mx-auto sm:mx-0">
                <p className="text-white font-bold">ROK</p>
            </div>
            <div className="basis-[100%] sm:basis-[80%] border-0 text-center sm:text-left pb-0 ml-0 sm:ml-8 mt-3 sm:mt-0">
                <p className="text-green-500 font-bold">Rokomari.com</p>
                <p className="text-sm text-slate-500 my-1">Front End Developer</p>
                <p className="text-sm text-slate-400">Nov 2018 - Present | Dhaka, Bangladeh</p>
            </div>
        </div>
    </div>
  );
};

export default ExperienceList;