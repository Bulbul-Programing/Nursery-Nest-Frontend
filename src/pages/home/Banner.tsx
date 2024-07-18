import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

const Banner = () => {
  const bannerData = [
    {
      title: "Blossom with Us",
      description:
        "Join us on a journey of growth and discovery. Our vibrant, nurturing environment is perfect for your child's development.",
      image: "https://i.ibb.co/XkxD4VM/New-Project-2.png",
    },
    {
      title: "Planting Seeds of Joy",
      description:
        "We plant seeds of joy and wonder in every child. Explore our garden of learning and see your child flourish at Nursery Nest.",
      image: "https://i.ibb.co/Fg4xvtz/New-Project-4.png",
    },
    {
      title: "Nature's Playground",
      description:
        "At Nursery Nest, we cultivate curiosity and creativity. Dive into our green haven and watch your child thrive.",
      image: "https://i.ibb.co/WkrP1D4/New-Project-6.png",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {bannerData.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className={`flex m-2 flex-col-reverse md:flex-row lg:flex-row shadow-lg px-5 gap-y-5 md:px-10 lg:px-20 py-5 md:py-10 lg:py-10 rounded-lg justify-between items-center }`}
          >
            <div className=" w-full md:w-1/2 lg:w-1/2">
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold my-5">
                  {item.title}
                </h1>
              </motion.div>
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 0.7, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <p className="text-slate-500 mb-5">{item.description}</p>
              </motion.div>
              <Link
                to="/shop"
                className="btn hover:bg-[#6ba56b] bg-[#8FBC8F] text-white ml-3"
              >
                Shop Now
              </Link>
            </div>
            <motion.div
              className="card"
              initial={{
                opacity: 0,
                // if odd index card,slide from right instead of left
                x: 150,
              }}
              whileInView={{
                opacity: 1,
                x: 0, // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: false }}
            >
              <div>
                <img className="w-[420px] drop-shadow-2xl rounded-md" src={item.image} />
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
