import Banner from "./Banner/Banner.jsx";
import Category from "./Category/Category.jsx";
import Featured from "./Featured/Featured.jsx";
import PopularMenu from "./PopularMenu/PopularMenu.jsx";
import Testimonials from "./Testimonials/Testimonials.jsx";
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>bistro boss - home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;