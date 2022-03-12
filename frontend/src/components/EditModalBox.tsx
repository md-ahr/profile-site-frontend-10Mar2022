import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState } from '../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const ModalBox = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { user }: any = useGlobalState();

    const [userInfo, setUserInfo] = useState({
        age: user.age,
        userExperience: 0,
        phone: '',
        email: user.email,
        userLocation: ''
    });

    const handleInputChange = (e: React.FormEvent<EventTarget>) => {
        const {name, value} = e.target as HTMLInputElement;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const userInfoUpdate = async() => {
        try {
          const res: AxiosResponse<any> = await axios.put('/api/v1/auth/user', user);
          if (res.status === 200) {
            toast.success(res.data.message);
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
        userInfoUpdate();
        setUserInfo({
            age: user.age,
            userExperience: 0,
            phone: '',
            email: user.email,
            userLocation: ''
        });
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
                            <input name="age" value={userInfo.age} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="age" type="number" />
                        </div>
                        <div className="ml-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="userExperience">Experience</label>
                            <input name="userExperience" value={userInfo.userExperience} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="userExperience" type="number" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="age">Phone</label>
                        <input name="phone" value={userInfo.phone} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="phone" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="age">Email</label>
                        <input name="email" value={userInfo.email} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="email" type="email" disabled />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="userLocation">Location</label>
                        <input name="userLocation" value={userInfo.userLocation} onChange={handleInputChange} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="userLocation" type="text" />
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
