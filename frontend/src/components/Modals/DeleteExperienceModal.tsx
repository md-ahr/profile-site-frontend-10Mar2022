import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';

const DeleteExperienceModal = (props: any) => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { token, user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const deleteExperience = async() => {
        try {
            const res: AxiosResponse<any> = await axios.delete(`/api/v1/experiences/${props.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status === 200) {
            toast.success(res.data.message);
            user.experiences = user.experiences.filter((item: any) => item._id !== res.data.experience._id);
            localStorage.setItem('user', JSON.stringify(user));
            const userData: any = localStorage.getItem('user');
            dispatch({ type: 'experience', value: JSON.parse(userData) });
            setOpen(false);
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleDelete = () => {
        deleteExperience();
        setOpen(false);
    };

    const handleReset = () => {
        setOpen(false);
    };

    return (
        <>
            <button type="button" onClick={onOpenModal} className="text-red-500 basis-[3%] border-2 border-red-500 px-3 py-2 ml-6 rounded hover:bg-red-600 hover:text-red-100 transition ease duration-500"><FaTrashAlt /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center text-md mt-4">Are you sure want to delete?</h2>
                <div className="text-center mt-5 mb-2">
                    <button type="button" onClick={() => { handleDelete(); props.handleUpdateData(); }} className="text-sm bg-teal-500 text-white font-bold px-5 py-2 rounded">
                        Yes
                    </button>
                    <button type="reset" onClick={handleReset} className="text-sm bg-orange-500 text-white font-bold px-5 py-2 rounded ml-6">
                        No
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default DeleteExperienceModal;
