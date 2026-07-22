import "../styles/homepage.css";
import HeroSection from "../components/home/HomeSection";
import PopularDestinationsSection from "../components/home/PopularDestinationsSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import ExploreBangladeshSection from "../components/home/ExploreBangladeshSection";
import BestHotelsSection from "../components/home/BestHotelsSection";


const HomePage = () => {
  return (
    <>
    <HeroSection/>
    <PopularDestinationsSection/>
    <WhyChooseSection/>
    <ExploreBangladeshSection/>
    <BestHotelsSection/>
    </>
  );
};

export default HomePage;