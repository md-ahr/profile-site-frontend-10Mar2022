import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const ModalBox = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { user, id, token }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const [age, setAge] = useState(user.age);
    const [userExperience, setUserExperience] = useState(user.userExperience);
    const [phone, setPhone] = useState(user.phone);
    const [userLocation, setUserLocation] = useState(user.userLocation);

    const userInfoUpdate = async() => {
        try {
          const res: AxiosResponse<any> = await axios.patch(`/api/v1/auth/user/${id}`, { age, userExperience, phone, userLocation}, { headers: { 'Authorization': `Bearer ${token}` } });
          if (res.status === 200) {
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
            dispatch({ type: 'failure', value: { user: {}, token: '', id: '' } });
          }
        }
    };

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        userInfoUpdate();
    };

    return (
        <>
            <button type="button" onClick={onOpenModal} className="text-sm md:text-md text-slate-500 border-2 border-slate-500 px-3 py-2 ml-6 lg:ml-8 rounded hover:bg-slate-600 hover:text-slate-100 transition ease duration-500">
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
                            <input name="userExperience" value={userExperience} onChange={(e) => setUserExperience(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="userExperience" type="text" />
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
