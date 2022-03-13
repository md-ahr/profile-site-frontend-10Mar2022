import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalState, useGlobalDispatch } from '../context/userContext';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Home = () => {

  const {id} = useParams()

  const { token }: any = useGlobalState();
  const dispatch: any = useGlobalDispatch();

  const getUserData = async() => {
    try {
      const res: AxiosResponse<any> = await axios.get(`/api/v1/auth/user/${id}`, { headers: { 'Authorization': `Bearer ${token}` }});
      if (res.status === 200) {
        dispatch({ type: 'user', value: {} });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const user: any = localStorage.getItem('user');
        dispatch({ type: 'success', value: { user: JSON.parse(user), id, token } });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex items-start flex-wrap w-[95%] mx-auto my-8">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;