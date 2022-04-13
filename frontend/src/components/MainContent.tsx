import BasicInfo from './BasicInfo';
import ExperienceList from './Experience';

const MainContent = () => {
  return (
    <div className="basis-[100%] lg:basis-[65%] xl:basis-[68%] ml-0 lg:ml-6">
      <BasicInfo />
      <ExperienceList />
    </div>
  );
};

export default MainContent;
