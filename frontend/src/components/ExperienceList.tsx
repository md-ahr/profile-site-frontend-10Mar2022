import { FaRegEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalState } from '../context/userContext';

const ExperienceList = () => {

    const [experiences, setExperiences] = useState([]);

    const { token }: any = useGlobalState();

    const getExperiences = async () => {
        try {
            const res: AxiosResponse<any> = await axios.get('/api/v1/experiences', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status === 200) {
                setExperiences(res.data.experiences);
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        getExperiences();
    }, []);

  return (
    <div className="bg-white shadow rounded px-8 pt-6 pb-8 ml-0 lg:ml-0 mt-6">
        <div className="flex items-center flex-wrap">
            <h2 className="text-slate-700 basis-[100%] sm:basis-[30%] md:basis-[30%] text-md md:text-xl xl:text-2xl font-bold mb-3 sm:mb-0">Experience</h2>
            <button type="button" className="text-green-500 basis-[auto] text-xs sm:text-sm border-2 border-green-500 rounded font-medium px-4 py-2 ml-0 sm:ml-6 lg:ml-8 hover:bg-green-500 hover:text-white transition ease duration-500">Add Experience</button>
            <button type="button" className="text-md text-slate-500 basis-[3%] border-2 border-slate-500 px-3 py-2 ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
                <FaRegEdit />
            </button>
        </div>
        {experiences && experiences.map((experience: any) => (
            <div key={experience._id} className="flex items-center flex-wrap border-b last:border-b-0 pb-6 last:pb-0 mt-7">
                <img src={experience.companyLogo} className="w-[50px] border-2 border-slate-300 rounded-full p-1 mx-auto sm:mx-0" alt={experience.companyLogo} />
                <div className="basis-[100%] sm:basis-[80%] text-center sm:text-left pb-6 last:pb-0 ml-0 sm:ml-8 mt-3 sm:mt-0">
                    <p className="text-green-500 font-bold">{experience.companyName}</p>
                    <p className="text-sm text-slate-500 my-1">{experience.designation}</p>
                    <p className="text-sm text-slate-400">{experience.startDate} - {experience.endDate} | {experience.location}</p>
                </div>
            </div>
        ))}
    </div>
  );
};

export default ExperienceList;