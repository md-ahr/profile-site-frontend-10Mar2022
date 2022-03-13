import { useGlobalState } from '../context/userContext';
import SkillModal from './SkillModal';

const SkillList = () => {
    const { user }: any = useGlobalState();
    return (
        <>
            <div className="flex items-center justify-center border-t pt-6 mt-8">
                <SkillModal />
            </div>
            <div className="flex items-center justify-center flex-wrap mt-3">
                {user.skills.map((skill: string) => (
                    <>
                        {skill && <button key={skill} className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">{skill}</button>}
                    </>
                ))}
            </div>
        </>
    );
};

export default SkillList;