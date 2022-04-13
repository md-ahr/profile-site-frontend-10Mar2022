import { FC } from 'react';

interface Skill {
    skill: {}
}

const Skill: FC<Skill> = ({ skill }: Skill): JSX.Element => {
  return (
    <>
        {skill && <button className="text-xs border border-slate-300 bg-slate-100 text-green-500 rounded-full font-medium px-5 py-2 mt-3 mr-3">{skill}</button>}
    </>
  );
};

export default Skill;