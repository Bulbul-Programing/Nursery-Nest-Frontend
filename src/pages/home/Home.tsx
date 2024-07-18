import Banner from "./Banner";
import NewCollection from "./NewCollection";
import OurService from "./OurService";
import TopProduct from "./TopProduct";

const home = () => {
    return (
        <div>
            <Banner></Banner>
            <NewCollection></NewCollection>
            <OurService></OurService>
            <TopProduct></TopProduct>
        </div>
    );
};

export default home;