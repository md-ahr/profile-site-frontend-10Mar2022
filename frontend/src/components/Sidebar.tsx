import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../context/userContext';
import BioModal from './BioModal';
import SkillList from './SkillList';

const Sidebar = () => {

    const { user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const handleLogout = () => {
        toast.info('User successfully logout!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('experiences');
        dispatch({ type: 'failure', value: { token: '', user: '' } });
        dispatch({ type: 'experience', experiences: '' });
    }

    return (
        <div className="bg-white shadow rounded basis-[100%] lg:basis-[30%] mx-auto md:mx-0 px-8 pt-6 pb-8 mt-5">
            <img src={`${user.profilePic}`} className="border-2 rounded-full block w-[85px] h-[85px] object-coder p-1 mx-auto" alt="profile_pic" />
            <div className="text-center">
                <h1 className="font-bold text-green-500 mt-4">{user.name}</h1>
                {user.userDesignation ? (
                    <p className="text-sm sm:text-md text-slate-700 font-bold">{user.userDesignation}</p>
                ) : (
                    <p className="text-sm text-slate-400 font-medium">Designation Not Available</p>
                )}
            </div>
            <div className="text-center mt-4">
                <BioModal />
            </div>
            {user.bio ? (
                <p className="text-slate-500 text-sm text-center leading-5 tracking-wide my-6">{user.bio}</p>
            ) : (
                <p className="text-sm text-slate-400 font-medium text-center my-6">Bio Not Available</p>
            )}
            <SkillList />
            <div className="mt-8 pt-4 border-t text-center">
                <button type="button" onClick={handleLogout} className="text-sm font-medium text-sky-600">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
