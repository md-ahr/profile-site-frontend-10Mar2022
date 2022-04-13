import { FC } from 'react';
import BioModal from '../Modals/BioModal';

interface UserBio {
  bio: string;
}

const Bio: FC<UserBio> = ({ bio }: UserBio): JSX.Element => {
  return (
    <div className="text-center border-t mt-6 pt-5">
        <BioModal />
        {bio ? (
            <p className="text-slate-500 text-sm text-center leading-5 tracking-wide my-6">{bio}</p>
        ) : (
            <p className="text-sm text-slate-400 font-medium text-center my-6">Bio Not Available</p>
        )}
    </div>
  );
};

export default Bio;