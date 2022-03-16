import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { useGlobalState } from '../context/userContext';

const Home = () => {
  const state = useGlobalState();
  return (
    <div className="flex items-start flex-wrap w-[95%] mx-auto my-8">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;