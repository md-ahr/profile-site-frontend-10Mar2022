import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Home = () => {
  return (
    <div className="flex items-start flex-wrap w-[95%] mx-auto my-8">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;