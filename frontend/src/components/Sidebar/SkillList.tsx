import { FC } from 'react';
import SkillModal from '../Modals/SkillModal';
import Skill from './Skill';

interface UserSkills {
    skills: string[];
}

const SkillList: FC<UserSkills> = ({ skills }: UserSkills): JSX.Element => {
    return (
        <div className="text-center border-t pt-7 mt-8">
            <SkillModal />
            {!skills[0] && <p className="text-sm text-center text-slate-400 font-medium mt-6">Skills Not Available</p>}
            <div className="flex items-center justify-center flex-wrap mt-3">
                {skills && skills.map((skill: string) => (
                    <Skill key={skill} skill={skill} />
                ))}
            </div>
        </div>
    );
};

export default SkillList;