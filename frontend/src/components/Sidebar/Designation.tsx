import { FC } from 'react';

interface UserDesignation {
    designation: string;
    name: string;
}

const Designation: FC<UserDesignation> = ({ name, designation }: UserDesignation): JSX.Element => {
  return (
    <div className="text-center">
        <h1 className="font-bold text-green-500 uppercase mt-4">{name}</h1>
        {designation ? (
            <p className="text-sm sm:text-md text-slate-700 font-bold">{designation}</p>
        ) : (
            <p className="text-sm text-slate-400 font-medium">Designation Not Available</p>
        )}
    </div>
  );
};

export default Designation;