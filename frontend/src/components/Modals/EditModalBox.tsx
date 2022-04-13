import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const ModalBox = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { token, user }: any = useGlobalState() || {};
    const dispatch: any = useGlobalDispatch();

    const [age, setAge] = useState(user && user.age);
    const [userExperience, setUserExperience] = useState(user && user.userExperience);
    const [phone, setPhone] = useState(user && user.phone);
    const [userLocation, setUserLocation] = useState(user && user.userLocation);

    const userInfoUpdate = async() => {
        if (!age) {
            toast.error('Please provide your age!');
            return;
        } else if (age < 18) {
            toast.error('Age must be greater than or equal to 18 years old!');
            return;
        } else if (!age.match(/^\d+$/)) {
            toast.error('Age should be a valid number!');
            return;
        }
        if (!userExperience) {
            toast.error('Please provide your years of experience!');
            return;
        }
        if (!phone) {
            toast.error('Please provide your phone number!');
            return;
        } else if (!phone.match(/^\d+$/)) {
            toast.error('Please provide your valid phone number!');
            return;
        }
        if (!userLocation) {
            toast.error('Please provide your location!');
            return;
        }
        try {
          const res: AxiosResponse<any> = await axios.patch(`/api/v1/auth/user/${user._id}`, { age, userExperience, phone, userLocation}, { headers: { 'Authorization': `Bearer ${token}` } });
          if (res.status === 200) {
            toast.success(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const user: any = localStorage.getItem('user');
            dispatch({ type: 'success', value: { token, user: JSON.parse(user) } });
            setOpen(false);
          }
        } catch (error) {
            setOpen(true);
            const err = error as AxiosError;
            if (err.response) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        userInfoUpdate();
    };

    return (
        <>
            <button type="button" onClick={onOpenModal} role="edit" className="text-sm md:text-md text-slate-500 border-2 border-slate-500 px-3 py-2 ml-6 lg:ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
            <FaRegEdit /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h3 className="text-lg font-medium border-b pb-3">Edit Basic Information</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                   <div className="flex mb-3">
                        <div>
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="age">Age</label>
                            <input name="age" value={age} onChange={(e) => setAge(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="age" type="text" />
                        </div>
                        <div className="ml-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="userExperience">Experience</label>
                            <input name="userExperience" value={userExperience} onChange={(e) => setUserExperience(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="userExperience" type="number" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="age">Phone</label>
                        <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="phone" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="userLocation">Location</label>
                        <input name="userLocation" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="userLocation" type="text" />
                    </div>
                    <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
                        Update
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default ModalBox;
