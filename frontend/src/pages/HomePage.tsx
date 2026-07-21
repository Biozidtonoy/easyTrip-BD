import "../styles/homepage.css";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HomeSection";
import PopularDestinationsSection from "../components/home/PopularDestinationsSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import ExploreBangladeshSection from "../components/home/ExploreBangladeshSection";
import BestHotelsSection from "../components/home/BestHotelsSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <PopularDestinationsSection/>
    <WhyChooseSection/>
    <ExploreBangladeshSection/>
    <BestHotelsSection/>
    <Footer/>
    </>
  );
};

export default HomePage;