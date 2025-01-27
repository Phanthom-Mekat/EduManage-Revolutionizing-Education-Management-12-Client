import PopularClassesSlider from "@/components/Home/PopularClassesSlider";
import Banner from "../../components/Home/Banner";
import PartnersSection from "../../components/Home/PartnersSection";

const Home = () => {
    return (
        <div>
            <Banner/>
            <PartnersSection/>
            <PopularClassesSlider/>
        </div>
    );
};

export default Home;