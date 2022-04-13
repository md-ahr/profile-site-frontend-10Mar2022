import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const SkillModal = () => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { token, user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const [skills, setSkills] = useState(user.skills);

    const userInfoUpdate = async() => {
        if (!skills.length) {
            toast.error('Please provide at least one skill!');
            return;
        }
        try {
          const res: AxiosResponse<any> = await axios.patch(`/api/v1/auth/user/${user._id}`, { skills }, { headers: { 'Authorization': `Bearer ${token}` } });
          if (res.status === 200) {
            toast.success(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const user: any = localStorage.getItem('user');
            dispatch({ type: 'success', value: { token, user: JSON.parse(user) } });
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
        userInfoUpdate();
    };

    return (
        <>
            <button type="button" onClick={onOpenModal} className="text-sm text-green-500 border-2 border-green-500 font-bold px-5 py-2 rounded hover:bg-green-600 hover:text-white transition ease duration-500">Update Skills</button>
            <Modal open={open} onClose={onCloseModal} center>
                <h3 className="text-lg font-medium border-b pb-3">Update Skill</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="skills">Input by comma separated name</label>
                        <textarea name="skills" id="skills" rows={4} value={skills} onChange={(e) => setSkills(e.target.value.split(','))} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2"></textarea>
                    </div>
                    <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default SkillModal;