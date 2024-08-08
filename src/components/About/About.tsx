import { Link } from "react-router-dom";
import Service from "./Service";
import OurService from "../../pages/home/OurService";
const About = () => {
  return (
    <div>
      <div className='bg-[url("https://i.ibb.co/0MvXKtb/helena-hertz-w-WZz-Xl-Dp-Mog-unsplash.jpg")] bg-cover bg-center bg-fixed'>
        <h1 className="py-20 font-[Pacifico] text-center text-4xl font-semibold bg-[#519651] bg-opacity-40 text-white">
          About
        </h1>
      </div>
      <OurService></OurService>
      <div className=" flex flex-col md:flex-row lg:flex-row items-center justify-between gap-x-5 gap-y-5 m-5 md:m-10 lg:m-10">
        <img
          className=" w-full md:w-1/2 lg:w-1/2 rounded-lg"
          src="https://i.ibb.co/31xJX7W/stephanie-harvey-Bsx-Q60-Px-RNI-unsplash.jpg"
          alt=""
        />
        <div className="w-full md:w-1/2 lg:w-1/2">
          <p className="text-lg font-medium text-[#469646]">
            Welcome to Nursery Nest
          </p>
          <p className=" text-3xl md:text-2xl lg:text-4xl font-bold py-3 md:py-2 lg:py-5">Our Journey to Dreams</p>
          <p className="text-slate-500 text-base md:text-sm lg:text-base">
            Empowering all people to be plant people — a collection of articles
            from The Sill’s team of Plant Experts across a variety of plant care
            topics to inspire confidence in the next generation of plant
            parents. Welcome to Plant Parenthood™. Luckily, we have a few ideas
            on watering for optimum plant health.The Lustria succulents and
            other smaller specimen.
          </p>
          <Link to='/shop' className="text-lg font-semibold btn mt-5 md:mt-3 lg:mt-5 hover:bg-[#8FBC8F] hover:text-white"><span className="text-2xl">+</span> View The Shop </Link>
        </div>
      </div>
      <Service></Service>
      
    </div>
  );
};

export default About;
