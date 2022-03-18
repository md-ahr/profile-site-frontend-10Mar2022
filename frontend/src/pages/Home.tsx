import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Home = () => {
  return (
    <div className="h-[100vh] grid place-items-center">
      <div className="flex items-start flex-wrap w-[95%] mx-auto">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;