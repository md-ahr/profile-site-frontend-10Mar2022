import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const AddExperienceModal = () => {

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { user, id, token }: any = useGlobalState();
  const dispatch: any = useGlobalDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [userId, setUserId] = useState(id);

  const handleCheckInput = (e: React.FormEvent<EventTarget> | any) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const addExperience = async() => {
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('designation', designation);
    formData.append('location', location);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('companyLogo', companyLogo);
    formData.append('userId', userId);
    console.log(companyName, designation, location, startDate, endDate, companyLogo, userId);
    try {
      const res: AxiosResponse<any> = await axios.post('/api/v1/experiences', formData, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.status === 201) {
        console.log(res.data);
        toast.success(res.data.message);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const user: any = localStorage.getItem('user');
        dispatch({ type: 'success', value: { user: JSON.parse(user), id, token } });
        setOpen(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        toast.error(err.response?.data.message);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addExperience();
  };

  return (
    <>
      <button type="button" onClick={onOpenModal} className="text-sm font-bold text-green-500 border-2 border-green-500 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition ease duration-500">Add Experience</button>
      <Modal open={open} onClose={onCloseModal} center>
          <h3 className="text-lg font-medium border-b pb-3">Add Experience Information</h3>
          <form onSubmit={handleSubmit} className="mt-4">
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
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
                  <input name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="startDate" type="date" />
              </div>
              <div className="mb-3">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
                  <input name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="endDate" type="date" disabled={isChecked} />
              </div>
              <div className="mb-3">
                  <div className="form-check">
                    <input onChange={handleCheckInput} className="form-check-input border w-4 h-4 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="check" />
                    <label className="form-check-label inline-block text-gray-800 text-sm" htmlFor="check">I'm currently working here</label>
                  </div>
              </div>
              <div className="mb-3">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="companyLogo">Company Logo</label>
                  <input name="companyLogo" onChange={(e: React.FormEvent<HTMLInputElement> | any) => setCompanyLogo(e.target.files[0])} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="companyLogo" type="file" />
              </div>
              <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
                  Submit
              </button>
          </form>
      </Modal>
    </>
  );
};

export default AddExperienceModal;