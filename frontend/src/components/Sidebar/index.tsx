import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';
import SkillList from './SkillList';
import Bio from './Bio';
import Designation from './Designation';
import Logout from './Logout';

const Sidebar = (): JSX.Element => {

    const { user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const handleLogout = () => {
        toast.info('User successfully logout!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('experiences');
        dispatch({ type: 'failure', value: { token: '', user: '' } });
        dispatch({ type: 'experience', experiences: '' });
    };

    return (
        <div className="bg-white shadow rounded basis-[100%] lg:basis-[30%] mx-auto md:mx-0 px-8 pt-6 pb-8 mt-5">
            <img src={`${user.profilePic}`} className="border-2 rounded-full block w-[85px] h-[85px] object-coder p-1 mx-auto" alt="profile_pic" />
            <Designation name={user.name} designation={user.userDesignation} />
            <Bio bio={user.bio} />
            <SkillList skills={user.skills} />
            <Logout handleLogout={handleLogout} />
        </div>
    );
};

export default Sidebar;