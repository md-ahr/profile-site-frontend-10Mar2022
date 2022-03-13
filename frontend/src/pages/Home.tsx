import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useGlobalDispatch } from '../context/userContext';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Home = () => {

  const dispatch: any = useGlobalDispatch();

  const getUserData = async() => {
    try {
      const res: AxiosResponse<any> = await axios.get('/api/v1/auth/user');
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        // dispatch({ type: 'success', value: localStorage.getItem('token') });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        // dispatch({ type: 'success', value: '' });
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