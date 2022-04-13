import { FaRegEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalState } from '../../context/userContext';

const EditExperienceModal = (props: any) => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { token, user }: any = useGlobalState();

    const [isChecked, setIsChecked] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [designation, setDesignation] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userId, setUserId] = useState(user._id);
    const [companyLogo, setCompanyLogo] = useState('');

    const handleCheckInput = (e: React.FormEvent<EventTarget> | any) => {
      if (e.target.checked) {
        setIsChecked(true);
        setEndDate('Present');
      } else {
        setIsChecked(false);
      }
    };

    const getExperienceById = async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`/api/v1/experiences/${props.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status === 200) {
                setCompanyName(res.data.experience.companyName);
                setDesignation(res.data.experience.designation);
                setDesignation(res.data.experience.jobDescription);
                setLocation(res.data.experience.location);
                setJobDescription(res.data.experience.jobDescription);
                setStartDate(res.data.experience.startDate);
                setEndDate(res.data.experience.endDate);
                setCompanyLogo(res.data.experience.companyLogo);
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getExperienceById();
    }, []);

    const updateExperience = async() => {
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('designation', designation);
        formData.append('jobDescription', jobDescription);
        formData.append('location', location);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('companyLogo', companyLogo);
        formData.append('userId', userId);
        try {
          const res: AxiosResponse<any> = await axios.patch(`/api/v1/experiences/${props.id}`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
          if (res.status === 200) {
            toast.success(res.data.message);
            props.handleUpdateData();
            return res.status;
          }
        } catch (error) {
            setOpen(true);
            const err = error as AxiosError;
            if (err.response) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleSubmit = () => {
        const res = updateExperience();
        res.then((status) => {
            if (status === 200) {
                setOpen(false);
            }
        });
    };

    return (
        <>
            <button type="button" onClick={onOpenModal} className="text-blue-500 basis-[3%] border-2 border-blue-500 px-3 py-2 rounded hover:bg-blue-600 hover:text-blue-100 transition ease duration-500"><FaRegEdit /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h3 className="text-lg font-medium border-b pb-3">Update Experience Info</h3>
                <div className="mt-4">
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="companyName">Company Name</label>
                        <input name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="companyName" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="designation">Designation</label>
                        <input name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="designation" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="location">Location</label>
                        <input name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="location" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="jobDescription">Job Description</label>
                        <textarea name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} id="jobDescription" rows={3} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2"></textarea>
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="w-[48%]">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
                            <input name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="startDate" type="date" />
                        </div>
                        <div className="w-[48%] ml-3">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
                            <input name="endDate" value={isChecked ? 'Present' : endDate} onChange={(e) => setEndDate(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="endDate" type={isChecked ? 'text' : 'date'} disabled={isChecked} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-check">
                        <input onChange={handleCheckInput} className="form-check-input border w-4 h-4 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="check" />
                        <label className="form-check-label inline-block text-gray-800 text-sm" htmlFor="check">I'm currently working here</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="companyLogo">Company Logo</label>
                        {typeof companyLogo === 'string' && <img src={companyLogo} alt="company_logo" className="w-12 ml-6 mb-2" />}
                        <input name="companyLogo" onChange={(e: React.FormEvent<HTMLInputElement> | any) => setCompanyLogo(e.target.files[0])} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="companyLogo" type="file" />
                    </div>
                    <button type="button" onClick={handleSubmit} className="bg-green-500 text-white font-bold w-full py-2 rounded">
                        Update
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default EditExperienceModal;
