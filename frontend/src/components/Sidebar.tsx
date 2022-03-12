import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../context/userContext';

const Sidebar = () => {

    const { user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    console.log(user);

    const handleLogout = () => {
        toast.info('User successfully logout!');
        dispatch({ type: 'success', value: localStorage.removeItem('token') });
    }

    return (
        <div className="bg-white shadow rounded basis-[100%] lg:basis-[30%] mx-auto md:mx-0 px-8 pt-6 pb-8">
            <img src={user.profilePic} className="rounded-full block w-20 mx-auto" alt="profile_pic" />
            <div className="text-center">
                <h1 className="font-bold text-green-500 mt-4">{user.name}</h1>
                <p className="text-slate-500 text-sm">Front-End Developer</p>
            </div>
            <div className="text-center mt-4">
                <button type="submit" className="text-sm font-bold text-green-500 border-2 border-green-500 px-4 py-2 mt-2 rounded hover:bg-green-600 hover:text-white transition ease duration-500">Add Bio</button>
            </div>
            <p className="text-slate-500 text-xs text-center leading-5 tracking-wide my-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, provident expedita! Esse optio pariatur, error corporis odit reprehenderit eligendi quod unde aliquid accusantium tenetur dolor laboriosam molestiae harum vitae perferendis. Esse optio pariatur, error corporis odit reprehenderit eligendi.</p>
            <div className="flex items-center mt-8">
                <h2 className="text-slate-700 text-md sm:text-xl xl:text-2xl font-bold">Skills</h2>
                <button type="button" className="text-xs sm:text-sm text-green-500 border-2 border-green-500 font-bold px-2 sm:px-5 lg:px-[7px] xl:px-5 py-2 ml-6 sm:ml-8 md:ml-4 rounded hover:bg-green-600 hover:text-white transition ease duration-500">Add Skills</button>
                <button type="button" className="text-sm sm:text-md text-slate-500 border-2 border-slate-500 px-3 py-2 ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
                <FaRegEdit />
                </button>
            </div>
            <div className="flex items-center flex-wrap mt-3">
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">JavaScript</button>
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">HTML5</button>
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">CSS3</button>
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">Sass</button>
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">Tailwind</button>
                <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">Bootstrap</button>
            </div>
            <div className="mt-8 pt-4 border-t text-center">
                <button type="button" onClick={handleLogout} className="text-sm font-medium text-sky-600">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
