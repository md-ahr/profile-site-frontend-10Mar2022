import { useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';
import AddExperienceModal from '../Modals/AddExperienceModal';
import EditExperienceModal from '../Modals/EditExperienceModal';
import DeleteExperienceModal from '../Modals/DeleteExperienceModal';

const ExperienceList = (): JSX.Element => {

    const { token, user, experiences }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getExperiences = useCallback(async() => {
        try {
            const res: AxiosResponse<any> = await axios.get(`/api/v1/experiences/user/${user._id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status === 200) {
              localStorage.setItem('experiences', JSON.stringify(res.data.userExperience.experiences));
              const experiences: any = localStorage.getItem('experiences');
              dispatch({ type: 'experience', value: JSON.parse(experiences) });
            }
          } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
              console.log(err);
            }
          }
    }, [user._id, token]);

    useEffect(() => {
        let isSubscribed = true;
        getExperiences();
        return () => { isSubscribed = false };
    }, [getExperiences]);

    const handleUpdateData = () => {
        getExperiences();
    };

    return (
        <div className="bg-white shadow rounded px-8 pt-6 pb-8 ml-0 lg:ml-0 my-5">
            <div className="flex items-center justify-between flex-wrap">
                <h2 className="text-slate-700 text-md md:text-xl xl:text-2xl font-bold mb-0">Experience</h2>
                <div className="text-right">
                    <AddExperienceModal handleUpdateData={handleUpdateData} />
                </div>
            </div>
            {experiences && experiences.length  ? experiences.map((experience: any) => (
                <div key={experience._id} className="flex flex-wrap items-center border-b last:border-b-0 pb-6 last:pb-0 mt-7">
                    <img src={experience.companyLogo} className="w-[50px] h-[50px] object-cover block ml-auto mr-auto sm:mr-0 sm:ml-0 border-2 border-slate-300 rounded-full p-1" alt={experience.companyLogo} />
                    <div className="w-[100%] sm:w-[350px] xl:w-[500px] text-center sm:text-left ml-0 md:ml-8 mt-4 sm:mt-0 sm:ml-6">
                        <p className="text-green-500 font-bold">{experience.companyName}</p>
                        <p className="text-sm text-slate-500 my-1">{experience.designation}</p>
                            {experience.endDate !== 'Present' && <p className="text-sm text-slate-400">{new Date(experience.startDate).getDate()} { months[new Date(experience.startDate).getMonth()]}, {new Date(experience.startDate).getFullYear()} - {experience.endDate ? (new Date(experience.endDate).getDate() + ' ' + months[new Date(experience.endDate).getMonth()] + ', ' + new Date(experience.endDate).getFullYear()) : 'Present'} | {experience.location}
                        </p>}
                        {experience.endDate === 'Present' && <p className="text-sm text-slate-400">
                            {new Date(experience.startDate).getDate()} { months[new Date(experience.startDate).getMonth()]}, {new Date(experience.startDate).getFullYear()} - Present | {experience.location}
                        </p>}
                        <p className="text-sm text-slate-500 mt-2">{experience.jobDescription}</p>
                    </div>
                    <div className="ml-auto mr-auto sm:ml-auto sm:mr-0 mt-4 sm:mt-0">
                        <EditExperienceModal handleUpdateData={handleUpdateData} id={experience._id} />
                        <DeleteExperienceModal handleUpdateData={handleUpdateData} id={experience._id} />
                    </div>
                </div>
            )) : <p className="text-sm text-slate-400 font-medium mt-4">No experience available</p>}
        </div>
    );
};

export default ExperienceList;
