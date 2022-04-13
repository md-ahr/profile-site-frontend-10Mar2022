import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useGlobalState, useGlobalDispatch } from '../../context/userContext';
import axios, { AxiosResponse, AxiosError } from 'axios';

const BioModal = () => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { token, user }: any = useGlobalState();
    const dispatch: any = useGlobalDispatch();

    const [userDesignation, setUserDesignation] = useState(user && user.userDesignation);
    const [bio, setBio] = useState(user.bio);
    const [profilePic, setProfilePic] = useState(user && user.profilePic);

    const userInfoUpdate = async() => {
      if (!userDesignation) {
        toast.error('Please provide your designation!');
        return;
      }
      if (!bio) {
        toast.error('Please provide your bio description!');
        return;
      }
      const formData = new FormData();
      formData.append('userDesignation', userDesignation);
      formData.append('bio', bio);
      formData.append('profilePic', profilePic);
      try {
        const res: AxiosResponse<any> = await axios.patch(`/api/v1/auth/user/${user._id}`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
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
            <button type="button" onClick={onOpenModal} className="text-sm font-bold text-green-500 border-2 border-green-500 px-4 py-2 mt-2 rounded hover:bg-green-600 hover:text-white transition ease duration-500">Update Bio</button>
            <Modal open={open} onClose={onCloseModal} center>
                <h3 className="text-lg font-medium border-b pb-3">Update Bio Information</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="designation">Designation</label>
                        <input name="designation" value={userDesignation} onChange={(e) => setUserDesignation(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="designation" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="bio">Bio</label>
                        <textarea name="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="bio"></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="propfilePic">Profile Picture</label>
                        <input name="propfilePic" onChange={(e: React.FormEvent<HTMLInputElement> | any) => setProfilePic(e.target.files[0])} className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-grey-darker mb-2" id="propfilePic" type="file" />
                    </div>
                    <button type="submit" className="bg-green-500 text-white font-bold w-full py-2 rounded">
                        Submit
                    </button>
                </form>
            </Modal>
        </>
  );
};

export default BioModal;